/* eslint-disable complexity */
const validator = require('validator')
const isEmpty = require('./isEmpty')

const validateProfileInput = data => {
  const errors = Object.keys(data).reduce((obj, key) => {
    if (
      (key === 'handle' || key === 'status' || key === 'skills') &&
      isEmpty(data[key])
    ) {
      obj[key] = `${key} field is required`
    } else if (
      key === 'handle' &&
      !validator.isLength(data[key], { min: 2, max: 40 })
    ) {
      obj[key] = 'handle must be between 2 and 40 characters long'
    } else if (
      (key === 'website' ||
        key === 'youtube' ||
        key === 'twitter' ||
        key === 'facebook' ||
        key === 'linkedin' ||
        key === 'instagram') &&
      !isEmpty(data[key]) &&
      !validator.isURL(data[key])
    ) {
      obj[key] = `${key} is invalid URL`
    }

    return obj
  }, {})

  return { errors, isValid: isEmpty(errors) }
}

module.exports = validateProfileInput
