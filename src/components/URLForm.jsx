import React, { useState } from 'react';

// Función para sanitizar URLs
const sanitizeUrl = (url) => {
  const sanitizedUrl = url.replace(/[^a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]/g, '');
  return sanitizedUrl.trim();
};

const URLForm = ({ onSubmit }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl) {
      setError('Please enter a URL.');
      return;
    }

    const sanitizedUrl = sanitizeUrl(originalUrl);
    onSubmit(sanitizedUrl);
    setOriginalUrl('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-gray-800 rounded-full shadow-md p-1 max-w-xl mx-auto mb-5">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center flex-grow">
        <svg className="ml-3" width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.0859 9.5L19.2031 14.3828C17.25 16.3359 14.0859 16.3359 12.1719 14.3828C10.2969 12.5078 10.1797 9.53906 11.8984 7.58594L12.1328 7.35156C12.3281 7.07812 12.7578 7.03906 12.9922 7.27344C13.2656 7.50781 13.3047 7.89844 13.0703 8.17188L12.875 8.40625C11.5859 9.89062 11.6641 12.1172 13.0312 13.4844C14.5156 14.9688 16.8594 14.9688 18.3438 13.4844L23.1875 8.64062C24.6719 7.15625 24.6719 4.8125 23.1875 3.32812C21.7422 1.88281 19.3594 1.88281 17.9141 3.32812L17.0156 4.22656C16.7812 4.46094 16.3906 4.46094 16.1172 4.22656C15.8828 3.95312 15.8828 3.5625 16.1172 3.32812L17.0156 2.42969C18.9688 0.476562 22.1328 0.476562 24.0859 2.42969C26.0391 4.38281 26.0391 7.54688 24.0859 9.5ZM2.875 9.5L7.75781 4.65625C9.71094 2.70312 12.8359 2.70312 14.8281 4.65625C16.6641 6.49219 16.7812 9.46094 15.0625 11.4531L14.8281 11.6875C14.6328 11.9609 14.2422 12 13.9688 11.7656C13.6953 11.5312 13.6562 11.1406 13.8906 10.8672L14.125 10.6328C15.375 9.14844 15.2969 6.92188 13.9297 5.55469C12.4453 4.07031 10.1016 4.07031 8.61719 5.55469L3.77344 10.3984C2.28906 11.8828 2.28906 14.2266 3.77344 15.7109C5.21875 17.1562 7.60156 17.1562 9.04688 15.7109L9.94531 14.8125C10.1797 14.5781 10.5703 14.5781 10.8438 14.8125C11.0781 15.0469 11.0781 15.4766 10.8438 15.7109L9.94531 16.5703C7.99219 18.5234 4.82812 18.5234 2.875 16.5703C0.921875 14.6172 0.921875 11.4531 2.875 9.5Z" fill="#C9CED6"/>
        </svg>  
        <input
          id="originalUrl"
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter the link here"
          className="flex-grow bg-gray-800 text-white p-3 rounded-full focus:outline-none"
          required
        />
      </div>
      <button type="submit" className="bg-blue-700 text-white py-3 px-6 rounded-full shadow-md transition duration-300 hover:bg-blue-600 ml-2">
        Shorten Now!
      </button>
    </form>
  );
};

export default URLForm;
