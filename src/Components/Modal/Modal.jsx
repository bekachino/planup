import React from 'react';
import './modal.css';

const Modal = ({ open, toggleModal, children }) => {
  return (
    <div className={`modal modal-${open}`} onClick={() => toggleModal(false)}>
      <div className="modal-paper" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
