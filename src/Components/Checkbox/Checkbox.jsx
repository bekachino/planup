import React from 'react';
import './checkbox.css';

const Checkbox = ({ id, label, ...rest }) => {
  return (
    <div className="checkbox">
      <input type="checkbox" id={id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
