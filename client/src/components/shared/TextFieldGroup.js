import React from 'react'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
  type,
  error,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  info,
  required,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={`form-control form-control-lg ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string,
  required: PropTypes.bool.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text',
  required: false,
}

export default TextFieldGroup
