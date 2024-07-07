import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const HistoryPage = () => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await api.get(`/url/user/${userId}`);
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs', error);
        setError('Error fetching URLs. Please try again.');
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">My URL History</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="w-full max-w-md">
        {urls.map((url) => (
          <li key={url._id} className="bg-white text-gray-900 p-4 mb-2 rounded shadow-md">
            <p>Original URL: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.originalUrl}</a></p>
            <p>Short URL: <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.shortUrl}</a></p>
            <p>Clicks: {url.clicks}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
