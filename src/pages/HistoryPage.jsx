import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import URLList from '../components/URLList';

const HistoryPage = () => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    fetchUrls();
  }, []);

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

  const ensureValidUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-2xl mb-4">My URL History</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-yellow-500 mb-4">Loading...</p>}
      <URLList urls={urls} ensureValidUrl={ensureValidUrl} handleDelete={handleDelete} />
    </div>
  );
};

export default HistoryPage;
