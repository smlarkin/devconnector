import React from 'react'
import PropTypes from 'prop-types'

const InputGroup = ({
  error,
  placeholder,
  name,
  value,
  onChange,
  icon,
  type,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <textarea
        className={`form-control form-control-lg ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

InputGroup.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

InputGroup.defaultProps = {
  type: 'text',
}

export default InputGroup
