import React from 'react';
import './modal.css';

const Modal = ({ className, open, toggleModal, children }) => {
  return (
    <div className={`modal modal-${open}`} onMouseDown={() => toggleModal(false)}>
      <div className={`modal-paper ${className}`} onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
