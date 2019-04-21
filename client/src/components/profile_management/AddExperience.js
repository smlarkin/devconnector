import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addExperience, logErrors } from '../../redux/actions'
import { TextFieldGroup, TextAreaFieldGroup } from '../'

const AddExperience = props => {
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [description, setDescription] = useState('')
  const [current, setCurrent] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [errors, setErrors] = useState('')

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const experienceAdded = await props.addExperience({
        company,
        title,
        location,
        from,
        to,
        current,
        description,
      })

      if (experienceAdded) {
        setCompany('')
        setTitle('')
        setLocation('')
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
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3 text-center">
              * fields are required
            </small>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                error={errors.location}
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
                required={!disabled}
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
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                error={errors.description}
                info="Tell us about the position"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  addExperience: experienceData => dispatch(addExperience(experienceData)),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience))
