import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const URLItem = ({ url, onEdit, onDelete, editingUrl, setEditingUrl, newOriginalUrl, setNewOriginalUrl, handleUpdate, handleCancel }) => {
  const ensureValidUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return 'https://' + url;
    }
    return url;
  };

  return (
    <tr className="border-t border-gray-700">
      <td className="py-3 px-6">
        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.shortUrl}</a>
      </td>
      <td className="py-3 px-6">
        <a href={ensureValidUrl(url.originalUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.originalUrl}</a>
      </td>
      <td className="py-3 px-6">
        <QRCodeSVG value={url.shortUrl} size={48} />
      </td>
      <td className="py-3 px-6">{url.clicks}</td>
      <td className="py-3 px-6">
        <span className={`inline-block px-3 py-1 text-sm font-semibold ${url.status === 'Active' ? 'text-green-500 bg-green-100' : 'text-yellow-500 bg-yellow-100'} rounded-full`}>
          {url.status}
        </span>
      </td>
      <td className="py-3 px-6">{new Date(url.createdAt).toLocaleDateString()}</td>
      <td className="py-9 px-6 flex items-center space-x-2">
        {editingUrl && editingUrl._id === url._id ? (
          <form onSubmit={handleUpdate} className="flex items-center">
            <input
              type="text"
              value={newOriginalUrl}
              onChange={(e) => setNewOriginalUrl(ensureValidUrl(e.target.value))}
              className="w-full p-2 border rounded text-black"
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition duration-300 ml-2">Save</button>
            <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition duration-300 ml-2">Cancel</button>
          </form>
        ) : (
          <>
            <button onClick={() => onEdit(url)} className="text-blue-500 hover:text-blue-700">
              <svg className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 11.5V17C21.5 18.8856 21.5 19.8284 20.9142 20.4142C20.3284 21 19.3856 21 17.5 21H7.5C5.61438 21 4.67157 21 4.08579 20.4142C3.5 19.8284 3.5 18.8856 3.5 17V9C3.5 7.11438 3.5 6.17157 4.08579 5.58579C4.67157 5 5.61438 5 7.5 5H11" className="stroke-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.356 12.963L20.4398 6.85791C21.2074 5.71027 20.8994 4.15762 19.7517 3.38996C18.6041 2.62231 17.0515 2.93034 16.2838 4.07798L12.2001 10.1831C11.0592 11.8886 10.4798 13.908 10.5428 15.959L10.5599 16.5153C10.5688 16.8041 10.8592 16.9984 11.1296 16.8964L11.6503 16.6998C13.57 15.975 15.2152 14.6686 16.356 12.963Z" className="stroke-blue-500" strokeWidth="2"/>
              </svg>
            </button>
            <button onClick={() => onDelete(url._id)} className="text-red-500 hover:text-red-700">
              <svg className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.01444 12.4585C3.77445 10.3786 3.65445 9.33861 4.25097 8.6693C4.84749 8 5.89435 8 7.98808 8H17.0119C19.1056 8 20.1525 8 20.749 8.6693C21.3455 9.33861 21.2255 10.3786 20.9856 12.4585L20.4086 17.4585C20.2142 19.1436 20.117 19.9861 19.5482 20.4931C18.9794 21 18.1313 21 16.435 21H8.565C6.86873 21 6.02059 21 5.4518 20.4931C4.88302 19.9861 4.7858 19.1436 4.59136 17.4585L4.01444 12.4585Z" className="stroke-red-500" strokeWidth="2"/>
                <path d="M6.5 9V7C6.5 5.11438 6.5 4.17157 7.08579 3.58579C7.67157 3 8.61438 3 10.5 3H14.5C16.3856 3 17.3284 3 17.9142 3.58579C18.5 4.17157 18.5 5.11438 18.5 7V9" className="stroke-red-500" strokeWidth="2"/>
                <path d="M9.5 17V12" className="stroke-red-500" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21.5 8H3.5" className="stroke-red-500" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15.5 17V12" className="stroke-red-500" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        )}
      </td>
    </tr>
  );  
};

export default URLItem;
