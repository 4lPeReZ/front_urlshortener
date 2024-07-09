import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [newOriginalUrl, setNewOriginalUrl] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      fetchUrls(user._id);
    }
  }, []);

  const fetchUrls = async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`/url/user/${userId}`);
      setUrls(response.data.map(url => ({
        ...url,
        shortUrl: `${url.shortUrl}`,
      })));
    } catch (error) {
      console.error('Error fetching URLs', error);
      setError('Error fetching URLs. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const validOriginalUrl = ensureValidUrl(originalUrl);

    try {
      const response = await api.post('/url/shorten', { originalUrl: validOriginalUrl, userId });
      setUrls([...urls, {
        ...response.data,
        shortUrl: `${response.data.shortUrl}`,
      }]);
      setOriginalUrl('');
    } catch (error) {
      console.error('Error shortening URL', error);
      setError(error.response?.data?.error || 'Error shortening URL. Please try again.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/url/delete/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      console.error('Error deleting URL', error);
      setError('Error deleting URL. Please try again.');
    }
    setLoading(false);
  };

  const handleEdit = (url) => {
    setEditingUrl(url);
    setNewOriginalUrl(url.originalUrl);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validNewOriginalUrl = ensureValidUrl(newOriginalUrl);
    try {
      const response = await api.put(`/url/update/${editingUrl._id}`, { originalUrl: validNewOriginalUrl });
      const updatedUrl = {
        ...response.data,
        shortUrl: `${response.data.shortUrl}`
      };
      setUrls(urls.map((url) => (url._id === editingUrl._id ? updatedUrl : url)));
      setEditingUrl(null);
      setNewOriginalUrl('');
    } catch (error) {
      console.error('Error updating URL', error);
      setError('Error updating URL. Please try again.');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingUrl(null);
    setNewOriginalUrl('');
  };

  const ensureValidUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8 text-center">Shorten Your Loooong Links :)</h1>
      {isLoggedIn ? (
        <>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="originalUrl" className="block text-gray-700">Original URL</label>
              <input
                id="originalUrl"
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(ensureValidUrl(e.target.value))}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Acortar URL</button>
          </form>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {loading && <p className="text-yellow-500 mb-4">Loading...</p>}
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
                      {editingUrl && editingUrl._id === url._id ? (
                        <form onSubmit={handleUpdate} className="flex">
                          <input
                            type="text"
                            value={newOriginalUrl}
                            onChange={(e) => setNewOriginalUrl(ensureValidUrl(e.target.value))}
                            className="w-full p-2 border rounded text-black"
                            required
                          />
                          <button type="submit" className="bg-green-500 text-white p-2 rounded ml-2">Save</button>
                          <button onClick={handleCancel} className="bg-red-500 text-white p-2 rounded ml-2">Cancel</button>
                        </form>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(url)} className="text-blue-500 mr-2">Edit</button>
                          <button onClick={() => handleDelete(url._id)} className="text-red-500">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4">Please log in to shorten your links</p>
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded mr-4">Log In</button>
          <button onClick={handleRegister} className="bg-green-500 text-white p-2 rounded">Register</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
