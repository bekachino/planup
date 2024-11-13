import React from 'react';
import './input.css';

const Input = ({
  label,
  placeholder,
  onChange,
  isSelectInput,
  style,
  ...rest
}) => {
  return (
    <div
      className='input-container'
      style={style}
    >
      <label
        className='input-label'
        htmlFor={`${label}-input`}
      >{label}</label>
      <div className='input-wrapper'>
        <input
          id={`${label}-input`}
          className='input'
          onChange={onChange}
          placeholder={placeholder || label}
          {...rest}
        />
      </div>
      {isSelectInput && <span className='select-input-arrow' />}
    </div>
  );
};

export default Input;