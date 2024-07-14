import React, { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import CustomModal from '../components/CustomModal';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../handlers/authHandlers';

const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Modal state changed: ${isModalOpen}`);
  }, [isModalOpen]);

  const handleRegisterWrapper = async (userInfo) => {
    console.log('Handling register...');
    await handleRegister(userInfo, setError, setModalMessage);
    console.log(`Register error state: ${error}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('Modal closed');
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 md:p-8"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.svg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
      <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Shorten Your Loooong Links :)</span>
      </h1>
      <h3 className="mb-8 text-center text-gray-900 dark:text-white md:text-lg lg:text-xl">
        Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
      </h3>
      <div className="w-full max-w-md">
        <AuthForm isLogin={false} onSubmit={handleRegisterWrapper} />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default RegisterPage;
