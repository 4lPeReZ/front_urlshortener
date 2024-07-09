import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import URLForm from '../components/URLForm';
import URLList from '../components/URLList';
import {
  fetchUrls,
  handleSubmit,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleCancel,
} from '../handlers/urlHandlers';

const HomePage = () => {
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
      fetchUrls(user._id, setUrls, setLoading, setError);
    }
  }, []);

  const handleFormSubmit = (originalUrl) => {
    handleSubmit(originalUrl, urls, setUrls, setError, setLoading);
  };

  const handleUrlDelete = (id) => {
    handleDelete(id, urls, setUrls, setLoading, setError);
  };

  const handleUrlEdit = (url) => {
    handleEdit(url, setEditingUrl, setNewOriginalUrl);
  };

  const handleUrlUpdate = (e) => {
    handleUpdate(e, editingUrl, newOriginalUrl, urls, setUrls, setEditingUrl, setNewOriginalUrl, setLoading, setError);
  };

  const handleUrlCancel = () => {
    handleCancel(setEditingUrl, setNewOriginalUrl);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-white p-4 md:p-8"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.svg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="text-4xl mb-8 text-center">Shorten Your Loooong Links :)</h1>
      {isLoggedIn ? (
        <>
          <URLForm onSubmit={handleFormSubmit} />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {loading && <p className="text-yellow-500 mb-4">Loading...</p>}
          <h2 className="text-2xl mb-4">Shortened URLs</h2>
          <URLList
            urls={urls}
            onEdit={handleUrlEdit}
            onDelete={handleUrlDelete}
            editingUrl={editingUrl}
            setEditingUrl={setEditingUrl}
            newOriginalUrl={newOriginalUrl}
            setNewOriginalUrl={setNewOriginalUrl}
            handleUpdate={handleUrlUpdate}
            handleCancel={handleUrlCancel}
          />
        </>
      ) : (
        <div className="text-center">
          <p className="text-2xl mb-4">Please log in to shorten your links</p>
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-300 w-full md:w-auto mb-4 md:mb-0 md:mr-4">Log In</button>
          <button onClick={handleRegister} className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition duration-300 w-full md:w-auto">Register</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
