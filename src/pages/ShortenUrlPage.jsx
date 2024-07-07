import React, { useState } from 'react';
import api from '../api/axios';

const ShortenUrlPage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setError('User not authenticated.');
      return;
    }

    const userId = JSON.parse(storedUser)._id;

    try {
      const response = await api.post('/url/shorten', { originalUrl, userId });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL', error);
      setError(error.response?.data?.error || 'Error shortening URL. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="originalUrl" className="block text-gray-700">Original URL</label>
          <input
            id="originalUrl"
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Shorten URL</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {shortUrl && (
        <div className="mt-4">
          <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{shortUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default ShortenUrlPage;
