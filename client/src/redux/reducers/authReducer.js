import { REGISTERED_USER } from '../types'

const initialState = {
  isAuthenticated: false,
  user: {},
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTERED_USER:
      return { ...state, user: payload }
    default:
      return state
  }
}

export default authReducer
