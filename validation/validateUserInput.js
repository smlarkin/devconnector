/* eslint-disable complexity */
const validator = require('validator')
const isEmpty = require('./isEmpty')

const validateUserInput = data => {
  const errors = Object.keys(data).reduce((obj, key) => {
    if (isEmpty(data[key])) {
      obj[key] = `${
        key !== 'password2' ? key : 'password verification'
      } field is required`
    } else if (
      key === 'name' &&
      !validator.isLength(data[key], { min: 2, max: 30 })
    ) {
      obj[key] = 'name must be between 2 and 30 characters long'
    } else if (key === 'email' && !validator.isEmail(data[key])) {
      obj[key] = 'email is invalid'
    } else if (
      key === 'password' &&
      !validator.isLength(data[key], { min: 6, max: 30 })
    ) {
      obj[key] = 'passwords must be between 6 and 30 characters long'
    } else if (
      key === 'password2' &&
      !validator.equals(data.password2, data.password)
    ) {
      obj[key] = 'passwords must match'
    }

    return obj
  }, {})

  return { errors, isValid: isEmpty(errors) }
}

module.exports = validateUserInput
