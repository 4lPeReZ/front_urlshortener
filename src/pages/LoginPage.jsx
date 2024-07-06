// src/pages/LoginPage.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage = ({ onLogin }) => (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
    <AuthForm isLogin={true} onSubmit={onLogin} />
  </div>
);

export default LoginPage;
