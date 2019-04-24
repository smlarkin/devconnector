import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextAreaFieldGroup } from '../'
import { addPost, logErrors } from '../../redux/actions'

const PostForm = ({ auth, addPost, error }) => {
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const { name, avatar } = auth.user
      const addedPost = await addPost({
        text,
        name,
        avatar,
      })

      if (addedPost) {
        setText('')
        setErrors({})
        console.log('Post added')
      }
    } catch (err) {
      console.log('Post was not added')
    }
  }
  //  MAGIC MAGIC MAGIC
  // THIS IS THE WAY TO DO IT
  useEffect(() => {
    if (Object.keys(error).length) {
      setErrors(error)
      console.error('Errors:', error)
    }
  }, [error])

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={e => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  logErrors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  logErrors: err => dispatch(logErrors(err)),
  addPost: post => dispatch(addPost(post)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostForm))
