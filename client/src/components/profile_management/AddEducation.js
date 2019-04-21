import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addEducation, logErrors } from '../../redux/actions'
import { TextFieldGroup, TextAreaFieldGroup } from '../'

const AddEducation = props => {
  const [school, setSchool] = useState('')
  const [degree, setDegree] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [description, setDescription] = useState('')
  const [current, setCurrent] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [errors, setErrors] = useState('')

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const educationAdded = await props.addEducation({
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      })

      if (educationAdded) {
        setSchool('')
        setDegree('')
        setFieldOfStudy('')
        setFrom('')
        setTo('')
        setCurrent('')
        setErrors(false)
        setDisabled(false)
        props.logErrors({})
        props.history.push('/dashboard')
      }
    } catch (err) {
      setErrors(err)
      props.logErrors(err)
      console.error('errors', err)
    }
  }

  const handleChange = () => {
    setDisabled(!disabled)
    setCurrent(!current)
  }

  return (
    <div className="experience-form">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any relevant education past or current
            </p>
            <small className="d-block pb-3 text-center">
              * fields are required
            </small>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={e => setSchool(e.target.value)}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree Obtained"
                name="degree"
                value={degree}
                onChange={e => setDegree(e.target.value)}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="Field of Study"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={e => setFieldOfStudy(e.target.value)}
                error={errors.fieldOfStudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                type="date"
                name="from"
                value={from}
                onChange={e => setFrom(e.target.value)}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                type="date"
                name="to"
                value={to}
                onChange={e => setTo(e.target.value)}
                error={errors.to}
                disabled={disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={handleChange}
                />
                <label htmlFor="current" className="form-check-label">
                  Currently Attending
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Course or Degree Description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                error={errors.description}
                info="Tell us about this educational enterprise"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  addEducation: educationData => dispatch(addEducation(educationData)),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation))
