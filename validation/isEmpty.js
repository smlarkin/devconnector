const isEmpty = value =>
  !value ||
  (Array.isArray(value) && !value.length) ||
  (typeof value === 'object' && !Object.keys(value).length) ||
  (typeof value === 'string' && !value.trim().length)

module.exports = isEmpty
