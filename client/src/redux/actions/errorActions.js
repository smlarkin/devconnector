import { GET_ERRORS, RESET_ERRORS } from '../types'

export const getErrors = err => ({
  type: GET_ERRORS,
  payload: err.response.data,
})

export const resetErrors = () => ({
  type: RESET_ERRORS,
  payload: {},
})
