import { LOG_ERRORS } from '../types'

const initialState = {}

const errorReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOG_ERRORS:
      return payload
    default:
      return state
  }
}

export default errorReducer
