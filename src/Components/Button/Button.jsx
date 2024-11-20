import React from 'react';
import './button.css';

const Button = ({
  variant = 'contained',
  loading,
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      className={`button button-${variant} ${loading && 'button-loading'}`}
      disabled={loading || disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
