import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from '../../redux/actions'
import { Spinner, CommentForm, CommentFeed } from '../'

const Post = props => {
  const { post, loading } = props.post
  const { name, avatar, text, user, _id, comments } = post
  let postContent = null

  if (!post || loading || !Object.keys(post).length) {
    postContent = <Spinner />
  } else {
    postContent = (
      <div>
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
            </div>
          </div>
        </div>
        <CommentForm postId={_id} />
        <CommentFeed comments={comments} postId={_id} />
      </div>
    )
  }

  useEffect(() => {
    if (props.match.params.id) {
      props.getPost(props.match.params.id).catch(err => {
        console.error('Error:', err)
      })
    }
  }, [])

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back to Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  // addLike: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired,
  // deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
})

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getPost(postId)),
  // removeLike: postId => dispatch(removeLike(postId)),
  // deletePost: postId => dispatch(deletePost(postId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post))
