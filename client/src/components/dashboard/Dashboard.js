import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile, logErrors } from '../../redux/actions'
import { Spinner } from '../'

const Dashboard = props => {
  const [content, setContent] = useState('')

  const {
    auth: { user },
    profile: { profile, loading },
  } = props

  const noProfile = (
    <div>
      <p className="lead text-muted">Welcome {user.name} </p>
      <p>You have not yet setup a profile. Click below to do this.</p>
      <Link to="/create-profile" className="btn btn-lg btn-info">
        Create Profile
      </Link>
    </div>
  )

  useEffect(() => {
    if (!profile || loading) {
      props.getProfile()
      setContent(<Spinner />)
    } else if (Object.keys(profile).length) {
      setContent(<h1>TODO: DISPLAY PROFILE</h1>)
    } else {
      setContent(noProfile)
    }
  }, [profile])

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  getProfile: user => dispatch(getProfile(user)),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard))
