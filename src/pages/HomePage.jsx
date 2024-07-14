import React, { useState, useEffect } from 'react';
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
      <h1 className="mb-8 pt-32 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Shorten Your Loooong Links :)</span></h1>
      <h3 className='mb-8 pt-3 text-center text-gray-900 dark:text-white md:text-s lg:text-l'>Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</h3>
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
<div className="text-center py-10 px-4 rounded-lg">
  <h3 className="text-3xl mb-6 text-gray-200 font-bold relative inline-block">
    Please log in to shorten your links
    <span className="absolute inset-x-0 -bottom-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"></span>
  </h3>
</div>

      )}
    </div>
  );
};

export default HomePage;
