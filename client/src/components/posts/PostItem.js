import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost, addLike, removeLike } from '../../redux/actions'

const PostItem = ({ post, auth, deletePost, addLike, removeLike }) => {
  const { avatar, name, text, likes, _id, user } = post
  const { id } = auth.user

  const handleDelete = () => {
    deletePost(_id)
  }

  const handleLike = () => {
    addLike(_id)
  }

  const handleUnlike = () => {
    removeLike(_id)
  }

  const isLikedByUser = () => likes.filter(like => like.user === id).length

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/profiles/${user}`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={avatar}
              alt={name}
            />
          </Link>
          <br />
          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{text}</p>
          <button
            onClick={handleLike}
            type="button"
            className="btn btn-light mr-1"
          >
            <i
              className={
                isLikedByUser()
                  ? 'text-info fas fa-thumbs-up'
                  : 'fas fa-thumbs-up'
              }
            />
            <span className="badge badge-light">{likes.length}</span>
          </button>
          <button
            onClick={handleUnlike}
            type="button"
            className="btn btn-light mr-1"
          >
            <i className="text-secondary fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-info mr-1">
            Comments
          </Link>
          {user === id && (
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={handleDelete}
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  addLike: postId => dispatch(addLike(postId)),
  removeLike: postId => dispatch(removeLike(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostItem))
