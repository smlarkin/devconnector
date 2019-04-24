import {
  LOADING_POST,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  UPDATE_POST,
} from '../types'

const initialState = { posts: [], post: {}, loading: false }

const postReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING_POST:
      return { ...state, loading: true }
    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts] }
    case GET_POST:
      return { ...state, post: payload, loading: false }
    case GET_POSTS:
      return { ...state, posts: payload, loading: false }
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload._id ? payload : post
        ),
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false,
      }
    default:
      return state
  }
}

export default postReducer
