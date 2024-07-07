import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { QRCodeSVG } from 'qrcode.react';

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const userId = JSON.parse(localStorage.getItem('user'))._id;

    try {
      const response = await api.post('/url/shorten', { originalUrl, userId });
      setUrls([...urls, response.data]);
      setOriginalUrl('');
    } catch (error) {
      console.error('Error shortening URL', error);
      setError(error.response?.data?.error || 'Error shortening URL. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/url/delete/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      console.error('Error deleting URL', error);
      setError('Error deleting URL. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8 text-center">Shorten Your Loooong Links :)</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 max-w-md mx-auto">
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Acortar URL</button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h2 className="text-2xl mb-4">Shortened URLs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-black">
          <thead>
            <tr>
              <th className="py-2 px-4">Short Link</th>
              <th className="py-2 px-4">Original Link</th>
              <th className="py-2 px-4">QR Code</th>
              <th className="py-2 px-4">Clicks</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td className="py-2 px-4">
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.shortUrl}</a>
                </td>
                <td className="py-2 px-4">
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.originalUrl}</a>
                </td>
                <td className="py-2 px-4">
                  <QRCodeSVG value={url.shortUrl} size={64} />
                </td>
                <td className="py-2 px-4">{url.clicks}</td>
                <td className="py-2 px-4">{url.status}</td>
                <td className="py-2 px-4">{new Date(url.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4">
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

export default HomePage;
