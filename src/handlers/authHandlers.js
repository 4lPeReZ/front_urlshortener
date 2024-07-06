// src/handlers/authHandlers.js
import api from '../api/axios';

export const handleLogin = async (credentials, setIsLoggedIn, setUser) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    setIsLoggedIn(true);
    setUser({ name: response.data.username });
  } catch (error) {
    console.error('Error during login', error);
  }
};

export const handleRegister = async (userInfo, setIsLoggedIn, setUser) => {
  try {
    const response = await api.post('/auth/register', userInfo);
    localStorage.setItem('token', response.data.token);
    setIsLoggedIn(true);
    setUser({ name: response.data.username });
  } catch (error) {
    console.error('Error during registration', error);
  }
};
