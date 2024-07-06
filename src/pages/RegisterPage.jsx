// src/pages/RegisterPage.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage = ({ onRegister }) => (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
    <AuthForm isLogin={false} onSubmit={onRegister} />
  </div>
);

export default RegisterPage;
