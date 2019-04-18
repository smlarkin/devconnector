import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser, logErrors } from '../../redux/actions'
import { TextFieldGroup } from '../'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const handleSubmit = async e => {
    try {
      e.preventDefault()

      const user = await props.loginUser({ email, password })

      if (user) {
        setEmail('')
        setPassword('')
        setErrors({})
        props.logErrors({})
        props.history.push('/dashboard')
      }
    } catch (err) {
      setErrors(err)
      props.logErrors(err)
      console.error('errors', err)
    }
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('./dashboard')
    }
  }, [])

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form action="dashboard.html" onSubmit={handleSubmit}>
              <TextFieldGroup
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextFieldGroup
                type="password"
                error={errors.password}
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
