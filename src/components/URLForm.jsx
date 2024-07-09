import React, { useState } from 'react';

const URLForm = ({ onSubmit }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl) {
      setError('Please enter a URL.');
      return;
    }
    onSubmit(originalUrl);
    setOriginalUrl('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 max-w-md mx-auto">
      {error && <p className="text-red-500">{error}</p>}
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
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition duration-300 w-full md:w-auto">Acortar URL</button>
    </form>
  );
};

export default URLForm;
