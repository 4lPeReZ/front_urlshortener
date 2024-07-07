import React, { useState } from 'react';
import api from '../api/axios';

const URLForm = ({ onSubmit }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const userId = JSON.parse(localStorage.getItem('user'))?._id || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { originalUrl, userId };

    try {
      const response = await api.post('/url/shorten', payload);
      onSubmit(response.data);
      setOriginalUrl('');
    } catch (error) {
      console.error('Error during URL shortening', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="originalUrl">
          Original URL
        </label>
        <input
          id="originalUrl"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Acortar URL
      </button>
    </form>
  );
};

export default URLForm;
