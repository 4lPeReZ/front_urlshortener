// src/components/CustomModal.jsx
import React from 'react';
import './Modal.css';

const CustomModal = ({ isOpen, onRequestClose, message }) => {
  if (!isOpen) {
    console.log("Modal not open, returning null");
    return null;
  }

  console.log("Modal is open, rendering");

  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="text-lg mb-4 text-black">{message}</h2>
        <button onClick={onRequestClose} className="bg-blue-500 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
