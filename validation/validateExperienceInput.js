const isEmpty = require('./isEmpty')

const validateExperienceInput = data => {
  const errors = Object.keys(data).reduce((obj, key) => {
    if (
      (key === 'title' || key === 'company' || key === 'from') &&
      isEmpty(data[key])
    ) {
      obj[key] = `${key} field is required`
    }

    return obj
  }, {})

  return { errors, isValid: isEmpty(errors) }
}

module.exports = validateExperienceInput
