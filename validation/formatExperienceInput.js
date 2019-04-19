const isEmpty = require('./isEmpty')

const formatExperienceInput = data => {
  return Object.keys(data).reduce((obj, key) => {
    if (key === 'skills')
      obj.skills = data[key].split(',').map(skill => skill.trim())
    else if (
      key === 'youtube' ||
      key === 'twitter' ||
      key === 'facebook' ||
      key === 'linkedin' ||
      key === 'instagram'
    ) {
      obj.social
        ? (obj.social = { ...obj.social, [key]: data[key] })
        : (obj.social = { [key]: data[key] })
    } else obj[key] = data[key]

    return obj
  }, {})
}

module.exports = formatExperienceInput
