import React from 'react';
import './input.css';
import { formatPhoneNumber } from '../../utils';

const Input = ({
  type = 'text',
  key,
  className,
  label,
  values,
  placeholder,
  isSelectInput,
  onValueRemove,
  onChange,
  textarea,
  style,
  ...rest
}) => {
  return (
    <div className="input-container" style={style} key={key}>
      {!!label && (
        <label className="input-label" htmlFor={`${label}-input`}>
          {label}
        </label>
      )}
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
              className={`input ${className}`}
              placeholder={placeholder || label}
              {...rest}
            />
          ) : (
            <input
              type={type}
              id={`${label || 'custom'}-input`}
              className={`input ${className}`}
              placeholder={placeholder || label}
              onChange={(e) =>
                onChange({
                  target: {
                    name: e.target.name || '',
                    value:
                      type === 'tel'
                        ? formatPhoneNumber(e.target.value)
                        : e.target.value,
                  },
                })
              }
              {...rest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
