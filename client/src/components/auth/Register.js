import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser, logErrors } from '../../redux/actions'
import { TextFieldGroup } from '../'

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
        props.logErrors({})
        props.history.push('/login')
      }
    } catch (err) {
      setErrors(err)
      props.logErrors(err)
      console.error('errors', err)
    }
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard')
    }
  }, [])

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFieldGroup
                error={errors.name}
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <TextFieldGroup
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                info="This site uses Gravatar so if you want a profile image, use a
                Gravatar email"
              />
              <TextFieldGroup
                type="password"
                error={errors.password}
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <TextFieldGroup
                type="password"
                error={errors.password2}
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
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
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register))
