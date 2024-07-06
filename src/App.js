import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { handleLogin, handleRegister } from './handlers/authHandlers';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '' });

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={(credentials) => handleLogin(credentials, setIsLoggedIn, setUser)} />} />
        <Route path="/register" element={<RegisterPage onRegister={(userInfo) => handleRegister(userInfo, setIsLoggedIn, setUser)} />} />
      </Routes>
    </Router>
  );
};

export default App;
