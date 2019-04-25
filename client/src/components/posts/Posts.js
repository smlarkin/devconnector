import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner, PostForm, PostFeed } from '../'
import { getPosts } from '../../redux/actions'

const Posts = ({ getPosts, post }) => {
  const { posts, loading } = post
  let postContent = null

  if (!posts || loading) {
    postContent = <Spinner />
  } else {
    postContent = <PostFeed posts={posts} />
  }

  useEffect(() => {
    // if (!posts.length && !loading) {
    // }
    getPosts()
  }, [])

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
})

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Posts))
