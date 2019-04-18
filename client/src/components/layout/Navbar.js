import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, clearProfile } from '../../redux/actions'

const Navbar = props => {
  const { isAuthenticated, user } = props.auth

  const handleClick = async e => {
    try {
      e.preventDefault()
      await props.clearProfile()
      await props.logoutUser()
      props.history.push('/')
    } catch (err) {
      console.error('errors', err)
    }
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={handleClick}>
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: 25, marginRight: 5 }}
            title="connect your email to Gravatar for an image to display"
          />
          Logout
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {' '}
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  clearProfile: () => dispatch(clearProfile()),
  logoutUser: () => dispatch(logoutUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar))
