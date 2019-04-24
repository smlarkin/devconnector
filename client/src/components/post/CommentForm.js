import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextAreaFieldGroup } from '../'
import { addComment, logErrors } from '../../redux/actions'

const CommentForm = ({ auth, addComment, error, postId }) => {
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const { name, avatar } = auth.user
      const addedComment = await addComment(postId, {
        text,
        name,
        avatar,
      })

      if (addedComment) {
        setText('')
        setErrors({})
        console.log('Comment added')
      }
    } catch (err) {
      console.log('Comment was not added')
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
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply here"
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

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  logErrors: err => dispatch(logErrors(err)),
  addComment: (id, comment) => dispatch(addComment(id, comment)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentForm))
