import React from 'react';

const CustomModal = ({ isOpen, onRequestClose, message }) => {
  if (!isOpen) {
    console.log("Modal not open, returning null");
    return null;
  }

  console.log("Modal is open, rendering");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{message}</h2>
        <button 
          onClick={onRequestClose} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
