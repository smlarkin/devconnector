import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile }) => {
  const { user, status, company, location, handle, skills } = profile
  return (
    <div className="card card-body bg-light bm-3">
      <div className="row">
        <div className="col-2">
          <img src={user.avatar} alt={user.name} className="rounded-circle" />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{user.name}</h3>
          <p>
            {status}
            {company ? <span>at {company}</span> : null}
          </p>
          <p>{location ? <span>{location}</span> : null}</p>
          <Link to={`/profiles/${handle}`} className="btn btn-info">
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
