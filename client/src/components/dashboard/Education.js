import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteEducation, logErrors } from '../../redux/actions'
import Moment from 'react-moment'

const Education = props => {
  const education = props.education
    /* .sort((a, b) => Date.parse(a.from) + Date.parse(b.from)) */
    .map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> {' - '}
          {edu.current ? 'now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </td>
        <td>
          <button
            onClick={() => handleClick(edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ))

  const handleClick = async educationId => {
    try {
      const experienceDeleted = await props.deleteEducation(educationId)
      if (experienceDeleted) {
        props.logErrors({})
      }
    } catch (err) {
      props.logErrors(err)
      console.error('errors', err)
    }
  }

  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </div>
  )
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  logErrors: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  deleteEducation: educationId => dispatch(deleteEducation(educationId)),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  null,
  mapDispatchToProps
)(Education)
