import React from 'react';
import './modal.css';

const Modal = ({ className, open, toggleModal, style, children }) => {
  return (
    <div
      className={`modal modal-${open}`}
      onMouseDown={() => toggleModal(false)}
    >
      <div
        className={`modal-paper ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
