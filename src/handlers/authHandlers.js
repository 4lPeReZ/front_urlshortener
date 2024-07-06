// src/handlers/authHandlers.js
import api from '../api/axios';

export const handleLogin = async (credentials, setIsLoggedIn, setUser, setError, setModalMessage) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({ name: response.data.username }));
    setIsLoggedIn(true);
    setUser({ name: response.data.username });
    setModalMessage("Login successful!");
    setError(null);
  } catch (error) {
    console.error('Error during login', error);
    setError('Invalid email or password. Please try again.');
    setModalMessage('Invalid email or password. Please try again.');
  }
};

export const handleRegister = async (userInfo, setIsLoggedIn, setUser, setError, setModalMessage) => {
  try {
    const response = await api.post('/auth/register', userInfo);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({ name: response.data.username }));
    setIsLoggedIn(true);
    setUser({ name: response.data.username });
    setModalMessage("Registration successful! Redirecting to login...");
    setError(null);
  } catch (error) {
    console.error('Error during registration', error);
    setError('Error during registration. Please try again.');
    setModalMessage('Error during registration. Please try again.');
  }
};

export const handleLogout = (setIsLoggedIn, setUser, navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setIsLoggedIn(false);
  setUser({ name: '' });
  navigate('/');
};
