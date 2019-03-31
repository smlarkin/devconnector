/* eslint-disable complexity */
const validator = require('validator')
const isEmpty = require('./isEmpty')

const validate = data => {
  const errors = Object.keys(data).reduce((obj, key) => {
    if (isEmpty(data[key])) {
      obj[key] = `${
        key !== 'password2' ? key : 'password verification'
      } field is required`
    } else if (
      key === 'name' &&
      !validator.isLength(data.name, { min: 2, max: 30 })
    ) {
      obj.name = 'name must be between 2 and 30 characters long'
    } else if (key === 'email' && !validator.isEmail(data.email)) {
      obj.email = 'email is invalid'
    } else if (
      key === 'password' &&
      !validator.isLength(data.password, { min: 6, max: 30 })
    ) {
      obj.password = 'passwords must be between 6 and 30 characters long'
    } else if (
      key === 'password2' &&
      !validator.equals(data.password2, data.password)
    ) {
      obj.password2 = 'passwords must match'
    }

    return obj
  }, {})

  return { errors, isValid: isEmpty(errors) }
}

module.exports = validate
