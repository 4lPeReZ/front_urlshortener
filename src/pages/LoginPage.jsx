// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import CustomModal from '../components/Modal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../handlers/authHandlers';

const LoginPage = ({ setIsLoggedIn, setUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Modal state changed: ${isModalOpen}`);
  }, [isModalOpen]);

  const handleLoginWrapper = async (credentials) => {
    console.log('Handling login...');
    await handleLogin(credentials, setIsLoggedIn, setUser, setError, setModalMessage);
    console.log(`Login error state: ${error}`);
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
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <AuthForm isLogin={true} onSubmit={handleLoginWrapper} />
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default LoginPage;
