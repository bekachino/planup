import React from 'react';
import './input.css';

const Input = ({
  label,
  values,
  placeholder,
  isSelectInput,
  onValueRemove,
  textarea,
  style,
  ...rest
}) => {
  return (
    <div className="input-container" style={style}>
      <label className="input-label" htmlFor={`${label}-input`}>
        {label}
      </label>
      <div className="input-wrapper">
        {values?.map((value) => (
          <div
            className="multiple-values-element"
            onClick={(_) => onValueRemove(value?.id)}
            key={value?.id}
          >
            {value?.name || value?.value || value?.label}
          </div>
        ))}
        <div className="input-wrapper-inner">
          {textarea ? (
            <textarea
              id={`${label || 'custom'}-textarea`}
              className="input"
              placeholder={placeholder || label}
              {...rest}
            />
          ) : (
            <input
              id={`${label || 'custom'}-input`}
              className="input"
              placeholder={placeholder || label}
              {...rest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
