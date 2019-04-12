import { GET_ERRORS, RESET_ERRORS } from '../types'

const initialState = {}

const errorReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ERRORS:
      return payload
    case RESET_ERRORS:
      return payload
    default:
      return state
  }
}

export default errorReducer
