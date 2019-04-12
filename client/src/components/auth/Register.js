import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions'

const Register = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      const userWasCreated = await props.registerUser({
        name,
        email,
        password,
        password2,
      })

      if (userWasCreated) {
        setName('')
        setEmail('')
        setPassword('')
        setPassword2('')
        setErrors({})
        props.history.push('/login')
      }
    } catch (err) {
      setErrors(err)
      console.error('errors', err)
    }
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${errors.name &&
                    'is-invalid'}`}
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={`form-control form-control-lg ${errors.email &&
                    'is-invalid'}`}
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.password &&
                    'is-invalid'}`}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${errors.password2 &&
                    'is-invalid'}`}
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register))
