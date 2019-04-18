import React from 'react'
import PropTypes from 'prop-types'

const TextAreaFieldGroup = ({
  error,
  placeholder,
  name,
  value,
  onChange,
  info,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={`form-control form-control-lg ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
}

export default TextAreaFieldGroup
