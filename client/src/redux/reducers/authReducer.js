import { REGISTERED_USER, SET_USER } from '../types'
import { isEmpty } from '../../utils'

const initialState = {
  isAuthenticated: false,
  user: {},
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTERED_USER:
      return { ...state, user: payload }
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
      }
    default:
      return state
  }
}

export default authReducer
