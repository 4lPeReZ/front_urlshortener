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
        setUrls(response.data.map(url => ({
          ...url,
          shortUrl: `https://back-urlshortener.onrender.com/api/url/${url.shortUrl}`,
        })));
      } catch (error) {
        console.error('Error fetching URLs', error);
        setError('Error fetching URLs. Please try again.');
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/url/delete/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      console.error('Error deleting URL', error);
      setError('Error deleting URL. Please try again.');
    }
  };

  const ensureValidUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl mb-4">My URL History</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Short Link</th>
              <th className="px-4 py-2">Original Link</th>
              <th className="px-4 py-2">QR Code</th>
              <th className="px-4 py-2">Clicks</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} className="border-t border-gray-700">
                <td className="px-4 py-2">
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.shortUrl}</a>
                </td>
                <td className="px-4 py-2">
                  <a href={ensureValidUrl(url.originalUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.originalUrl}</a>
                </td>
                <td className="px-4 py-2">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url.shortUrl)}&size=100x100`} alt="QR Code" />
                </td>
                <td className="px-4 py-2">{url.clicks}</td>
                <td className="px-4 py-2">{url.status}</td>
                <td className="px-4 py-2">{new Date(url.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(url._id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
