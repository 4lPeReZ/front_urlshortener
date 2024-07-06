// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import CustomModal from '../components/Modal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../handlers/authHandlers';

const RegisterPage = ({ setIsLoggedIn, setUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Modal state changed: ${isModalOpen}`);
  }, [isModalOpen]);

  const handleRegisterWrapper = async (userInfo) => {
    console.log('Handling register...');
    await handleRegister(userInfo, setIsLoggedIn, setUser, setError, setModalMessage);
    console.log(`Register error state: ${error}`);
    if (error === null) {
      console.log('Setting modal open to true');
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('Modal closed');
    if (error === null) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <AuthForm isLogin={false} onSubmit={handleRegisterWrapper} />
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default RegisterPage;
