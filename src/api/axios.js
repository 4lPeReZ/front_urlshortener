// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-urlshortener.onrender.com/api', // Asegúrate de que esta URL esté correcta
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
