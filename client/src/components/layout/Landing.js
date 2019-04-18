import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = props => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('./dashboard')
    }
  }, [props.auth.isAuthenticated])

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector</h1>
              <p className="lead">
                {' '}
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              <Link to="register" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="login" className="btn btn-lg btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  // error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  // error: state.error,
})

export default connect(
  mapStateToProps,
  null
)(withRouter(Landing))
