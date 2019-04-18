import { LOG_ERRORS } from '../types'

export const logErrors = err => ({
  type: LOG_ERRORS,
  payload: err,
})
