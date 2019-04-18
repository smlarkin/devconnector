import { SET_PROFILE, LOADING_PROFILE, CLEAR_PROFILE } from '../types'

const initialState = { profile: null, profiles: null, loading: false }

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING_PROFILE:
      return { ...state, loading: true }
    case SET_PROFILE:
      return { ...state, profile: payload, loading: false }
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false }
    default:
      return state
  }
}

export default profileReducer
