import React from 'react'
import PropTypes from 'prop-types'

const SelectListGroup = ({ error, name, value, onChange, info, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <div className="form-group">
      <select
        className={`form-control form-control-lg ${error && 'is-invalid'}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectListGroup.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  options: PropTypes.array.isRequired,
}

export default SelectListGroup
