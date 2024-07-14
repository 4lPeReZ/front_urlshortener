import React, { useState } from 'react';

// Función para sanitizar el email
const sanitizeEmail = (email) => {
  const sanitizedEmail = email.replace(/[^\w@.-]/g, '');
  return sanitizedEmail.trim();
};

// Función para sanitizar el password
const sanitizePassword = (password) => {
  const sanitizedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/g, '');
  return sanitizedPassword.trim();
};

// Función para sanitizar el username
const sanitizeUsername = (username) => {
  const sanitizedUsername = username.replace(/[^a-zA-Z0-9]/g, '');
  return sanitizedUsername.trim();
};

const AuthForm = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !username)) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedPassword = sanitizePassword(password);
    const sanitizedUsername = sanitizeUsername(username);

    const payload = isLogin ? { email: sanitizedEmail, password: sanitizedPassword } : { email: sanitizedEmail, password: sanitizedPassword, username: sanitizedUsername };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md w-full mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      {!isLogin && (
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required={!isLogin}
          />
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 w-full shadow-md transition duration-300">
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
