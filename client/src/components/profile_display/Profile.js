import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfileByHandle, getRepos } from '../../redux/actions'
import {
  ProfileAbout,
  ProfileCreds,
  ProfileGitHub,
  ProfileHeader,
  Spinner,
  NotFound,
} from '../'

const Profile = props => {
  const {
    profile: { profile, loading },
    repos,
  } = props

  let profileContent = null

  if (profile && profile.githubUserName && !repos.length) {
    props
      .getRepos(profile.githubUserName)
      .catch(err => console.error('Error:', err))
  }

  if (loading) {
    profileContent = <Spinner />
  } else if (profile) {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {repos.length ? <ProfileGitHub repos={repos} /> : null}
      </div>
    )
  }

  useEffect(() => {
    if (props.match.params.handle) {
      props.getProfileByHandle(props.match.params.handle).catch(err => {
        console.error('Error:', err)
      })
    }
  }, [])

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {profileContent ? profileContent : <NotFound />}
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  repos: state.repo,
})

const mapDispatchToProps = dispatch => ({
  getProfileByHandle: handle => dispatch(getProfileByHandle(handle)),
  getRepos: githubUserName => dispatch(getRepos(githubUserName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile))
