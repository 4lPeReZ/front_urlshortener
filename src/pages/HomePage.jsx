import React, { useState, useEffect } from 'react';
import URLForm from '../components/URLForm';
import api from '../api/axios';

const HomePage = ({ isLoggedIn, user }) => {
  const [shortUrls, setShortUrls] = useState([]);
  const [remainingUrls, setRemainingUrls] = useState(5);
  const [error, setError] = useState('');

  const handleShorten = (newUrl) => {
    setShortUrls([...shortUrls, newUrl]);
    if (!isLoggedIn) {
      setRemainingUrls(remainingUrls - 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/url/delete/${id}`);
      setShortUrls(shortUrls.filter(url => url._id !== id));
    } catch (error) {
      console.error('Error deleting URL', error);
      setError('Error deleting URL. Please try again.');
    }
  };

  const handleEdit = async (id, newOriginalUrl) => {
    try {
      const response = await api.put(`/url/update/${id}`, { originalUrl: newOriginalUrl });
      setShortUrls(shortUrls.map(url => url._id === id ? response.data : url));
    } catch (error) {
      console.error('Error updating URL', error);
      setError('Error updating URL. Please try again.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUrls = async () => {
        try {
          const response = await api.get(`/url/user/${user._id}`);
          setShortUrls(response.data);
        } catch (error) {
          console.error('Error fetching URLs', error);
          setError('Error fetching URLs. Please try again.');
        }
      };

      fetchUrls();
    }
  }, [isLoggedIn, user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8">Shorten Your Loooong Links :)</h1>
      <URLForm onSubmit={handleShorten} />
      {!isLoggedIn && (
        <p className="mt-4">You can create {remainingUrls} more links. Register now to enjoy unlimited usage.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Shortened URLs</h2>
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
              {shortUrls.map((url) => (
                <tr key={url._id} className="border-t border-gray-700">
                  <td className="px-4 py-2">
                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.shortUrl}</a>
                  </td>
                  <td className="px-4 py-2">
                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.originalUrl}</a>
                  </td>
                  <td className="px-4 py-2">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url.shortUrl}&size=100x100`} alt="QR Code" />
                  </td>
                  <td className="px-4 py-2">{url.clicks}</td>
                  <td className="px-4 py-2">{url.status}</td>
                  <td className="px-4 py-2">{new Date(url.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button 
                      className="text-red-500" 
                      onClick={() => handleDelete(url._id)}
                    >
                      Delete
                    </button>
                    <button 
                      className="text-blue-500" 
                      onClick={() => handleEdit(url._id, prompt('Enter new URL:', url.originalUrl))}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
