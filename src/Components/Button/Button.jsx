import React from 'react';
import './button.css';

const Button = ({
  color = 'default',
  className,
  variant = 'contained',
  loading,
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      className={`button button-${variant} button-color-${color} ${loading && 'button-loading'} ${className}`}
      disabled={loading || disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
