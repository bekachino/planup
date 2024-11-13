import React from 'react';
import './input.css';

const Input = ({
  type = 'text',
  name,
  value,
  label,
  placeholder,
  onChange,
  required,
  style,
}) => {
  return (
    <div
      className='input-wrapper'
      style={style}
    >
      <span className='input-label'>{label}</span>
      <input
        className='input'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        required={required}
      />
    </div>
  );
};

export default Input;