import {
  LOADING_POST,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_POSTS,
} from '../types'

import { logErrors } from '../actions'

const loadingPost = () => ({
  type: LOADING_POST,
})

// BEST WAY TO DO IT !!!
const add_post = post => ({
  type: ADD_POST,
  payload: post,
})

const delete_post = postId => ({
  type: DELETE_POST,
  payload: postId,
})

const get_posts = posts => ({
  type: GET_POSTS,
  payload: posts,
})

const update_post = post => ({
  type: UPDATE_POST,
  payload: post,
})

const get_post = post => ({
  type: GET_POST,
  payload: post,
})

// BEST WAY TO DO IT!!!
export const addPost = post => async (dispatch, getState, { axios }) => {
  try {
    const { data } = await axios.post('/api/posts', post)
    return dispatch(add_post(data)) && dispatch(logErrors({}))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}

export const deletePost = postId => async (dispatch, getState, { axios }) => {
  try {
    const { data } = await axios.delete(`/api/posts/${postId}`)
    return data && dispatch(delete_post(postId))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}

export const getPosts = () => async (dispatch, getState, { axios }) => {
  try {
    dispatch(loadingPost())
    const { data } = await axios.get('/api/posts')
    return dispatch(get_posts(data))
  } catch (err) {
    throw dispatch(get_posts(null))
  }
}

export const addLike = postId => async (dispatch, getState, { axios }) => {
  try {
    const { data } = await axios.post(`/api/posts/like/${postId}`)
    return dispatch(update_post(data))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}

export const removeLike = postId => async (dispatch, getState, { axios }) => {
  try {
    const { data } = await axios.post(`/api/posts/unlike/${postId}`)
    return dispatch(update_post(data))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}

export const getPost = postId => async (dispatch, getState, { axios }) => {
  try {
    dispatch(loadingPost())
    const { data } = await axios.get(`/api/posts/${postId}`)
    return dispatch(get_post(data))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}

export const addComment = (postId, commentData) => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    const { data } = await axios.post(
      `/api/posts/comment/${postId}`,
      commentData
    )
    console.log(data)
    return dispatch(get_post(data))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}

export const deleteComment = (postId, commentId) => async (
  dispatch,
  getState,
  { axios }
) => {
  try {
    const { data } = await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`
    )
    console.log(data)
    return dispatch(get_post(data))
  } catch (err) {
    throw dispatch(logErrors(err.response.data))
  }
}
