import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteComment } from '../../redux/actions'

const CommentItem = ({ comment, postId, auth, deleteComment }) => {
  const { avatar, name, text, _id, user } = comment
  const { id } = auth.user

  const handleDeleteComment = () => {
    console.log('clicked')
    deleteComment(postId, _id)
  }

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={avatar}
              alt={name}
            />
          </a>
          <br />
          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{text}</p>
          {user === id && (
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={handleDeleteComment}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  deleteComment: (postId, _id) => dispatch(deleteComment(postId, _id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentItem))
