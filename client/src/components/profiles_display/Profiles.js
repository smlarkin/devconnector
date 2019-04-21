import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfiles, logErrors } from '../../redux/actions'
import { Spinner, ProfileItem } from '../'

const Profiles = props => {
  const {
    profile: { profiles, loading },
  } = props
  let profileItems = null

  if (!profiles || loading) {
    profileItems = <Spinner />
  } else if (profiles.length) {
    profileItems = profiles.map(profile => (
      <ProfileItem key={profile._id} profile={profile} />
    ))
  } else {
    profileItems = <h4>No profiles found...</h4>
  }

  useEffect(() => {
    props.getProfiles().catch(err => console.error(err))
  }, [])

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and collect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  getProfiles: () => dispatch(getProfiles()),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profiles))
