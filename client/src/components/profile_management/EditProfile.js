import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile, logErrors, createProfile } from '../../redux/actions'
import {
  TextFieldGroup,
  InputGroup,
  SelectListGroup,
  TextAreaFieldGroup,
} from '../'

const EditProfile = props => {
  const [showSocial, setShowSocial] = useState(false)
  const [handle, setHandle] = useState('')
  const [company, setCompany] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('')
  const [skills, setSkills] = useState('')
  const [bio, setBio] = useState('')
  const [githubUserName, setGithubUserName] = useState('')
  const [youtube, setYoutube] = useState('')
  const [twitter, setTwitter] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [instagram, setInstagram] = useState('')
  const [errors, setErrors] = useState('')

  useEffect(() => {
    ;(async () => {
      if (!props.profile.profile) {
        const {
          payload: {
            handle,
            company,
            website,
            status,
            skills,
            bio,
            githubUserName,
            social,
          },
        } = await props.getProfile()
        !Object.values(social).includes('') && setShowSocial(true)
        setHandle(handle)
        setCompany(company)
        setWebsite(website)
        setStatus(status)
        setSkills(skills.join(','))
        setBio(bio)
        setGithubUserName(githubUserName)
        setYoutube(social.youtube)
        setTwitter(social.twitter)
        setFacebook(social.facebook)
        setLinkedin(social.linkedin)
        setInstagram(social.instagram)
      } else {
        const {
          handle,
          company,
          website,
          status,
          skills,
          bio,
          githubUserName,
          social,
        } = props.profile.profile
        !Object.values(social).includes('') && setShowSocial(true)
        setHandle(handle)
        setCompany(company)
        setWebsite(website)
        setStatus(status)
        setSkills(skills.join(','))
        setBio(bio)
        setGithubUserName(githubUserName)
        setYoutube(social.youtube)
        setTwitter(social.twitter)
        setFacebook(social.facebook)
        setLinkedin(social.linkedin)
        setInstagram(social.instagram)
      }
    })()
  }, [])

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      const profile = await props.createProfile({
        handle,
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubUserName,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      })

      if (profile) {
        setShowSocial(false)
        setHandle('')
        setCompany('')
        setWebsite('')
        setLocation('')
        setStatus('')
        setSkills('')
        setBio('')
        setGithubUserName('')
        setYoutube('')
        setTwitter('')
        setFacebook('')
        setLinkedin('')
        setInstagram('')
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

  const handleClick = () => {
    setShowSocial(!showSocial)
  }

  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ]

  return (
    <div>
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3 text-center">
                * fields are required
              </small>
              <form onSubmit={handleSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  error={errors.handle}
                  info="A unique handle for your profile name"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  error={errors.company}
                  info="Could be your own company or the one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  error={errors.website}
                  info="Could be your website or a company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  error={errors.location}
                  info="City or city & state suggested (Los Angeles, CA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML, CSS, JS)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubUserName"
                  value={githubUserName}
                  onChange={e => setGithubUserName(e.target.value)}
                  error={errors.githubUserName}
                  info="For latest repos and your profile"
                />
                <TextAreaFieldGroup
                  placeholder="Short Biography"
                  name="bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  error={errors.bio}
                  info="Add a short bio"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <small className="form-text text-muted">Optional</small>
                </div>
                {showSocial && (
                  <div>
                    <InputGroup
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      icon="fab fa-twitter"
                      value={twitter}
                      onChange={e => setTwitter(e.target.value)}
                      error={errors.twitter}
                    />
                    <InputGroup
                      placeholder="Facebook Page URL"
                      name="facebook"
                      icon="fab fa-facebook"
                      value={facebook}
                      onChange={e => setFacebook(e.target.value)}
                      error={errors.facebook}
                    />
                    <InputGroup
                      placeholder="Linkedin Profile URL"
                      name="linkedin"
                      icon="fab fa-linkedin"
                      value={linkedin}
                      onChange={e => setLinkedin(e.target.value)}
                      error={errors.linkedin}
                    />
                    <InputGroup
                      placeholder="YouTube Channel URL"
                      name="youtube"
                      icon="fab fa-youtube"
                      value={youtube}
                      onChange={e => setYoutube(e.target.value)}
                      error={errors.youtube}
                    />
                    <InputGroup
                      placeholder="Instagram Page URL"
                      name="instagram"
                      icon="fab fa-instagram"
                      value={instagram}
                      onChange={e => setInstagram(e.target.value)}
                      error={errors.instagram}
                    />
                  </div>
                )}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  createProfile: profileData => dispatch(createProfile(profileData)),
  getProfile: () => dispatch(getProfile()),
  logErrors: err => dispatch(logErrors(err)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile))
