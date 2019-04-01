const isEmpty = require('./isEmpty')

const validateEducationInput = data => {
  const errors = Object.keys(data).reduce((obj, key) => {
    if (
      (key === 'school' || key === 'degree' || key === 'from') &&
      isEmpty(data[key])
    ) {
      obj[key] = `${key} field is required`
    }

    return obj
  }, {})

  return { errors, isValid: isEmpty(errors) }
}

module.exports = validateEducationInput
