import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfileByHandle } from '../../redux/actions'
import {
  ProfileAbout,
  ProfileCreds,
  ProfileGitHub,
  ProfileHeader,
  Spinner,
} from '../'

const Profile = props => {
  const {
    profile: { profile, loading },
  } = props
  let profileContent = null

  if (!profile || loading) {
    profileContent = <Spinner />
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles">Back To Profiles</Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubUserName ? (
          <ProfileGitHub username={profile.githubUserName} />
        ) : null}
      </div>
    )
  }

  useEffect(() => {
    props.match.params.handle &&
      props
        .getProfileByHandle(props.match.params.handle)
        .catch(err => console.error(err))
  }, [])

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})

const mapDispatchToProps = dispatch => ({
  getProfileByHandle: handle => dispatch(getProfileByHandle(handle)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile))
