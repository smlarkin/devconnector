const validator = require('validator')
const isEmpty = require('./isEmpty')

const validatePostInput = data => {
  const errors = Object.keys(data).reduce((obj, key) => {
    if (key === 'text' && isEmpty(data[key])) {
      obj[key] = `${key} field is required`
    } else if (
      key === 'text' &&
      !validator.isLength(data[key], { min: 1, max: 300 })
    ) {
      obj[key] = `${key} must be between 1 and 300 characters long`
    }

    return obj
  }, {})

  return { errors, isValid: isEmpty(errors) }
}

module.exports = validatePostInput
