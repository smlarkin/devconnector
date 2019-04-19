import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience, logErrors } from '../../redux/actions'
import Moment from 'react-moment'

const Experience = props => {
  const experience = props.experience
    /* .sort((a, b) => Date.parse(a.from) + Date.parse(b.from)) */
    .map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> {' - '}
          {exp.current ? 'now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button
            onClick={() => handleClick(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ))

  const handleClick = async experienceId => {
    try {
      const experienceDeleted = await props.deleteExperience(experienceId)
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
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </div>
  )
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  logErrors: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  deleteExperience: experienceId => dispatch(deleteExperience(experienceId)),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  null,
  mapDispatchToProps
)(Experience)
