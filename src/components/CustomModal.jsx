import React from 'react';

const CustomModal = ({ isOpen, onRequestClose, message }) => {
  if (!isOpen) {
    console.log("Modal not open, returning null");
    return null;
  }

  console.log("Modal is open, rendering");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{message}</h2>
        <div className="flex justify-center">
          <button 
            onClick={onRequestClose} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
