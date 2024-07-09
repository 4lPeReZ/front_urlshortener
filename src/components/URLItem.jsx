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
      <td className="py-2 px-4">
        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.shortUrl}</a>
      </td>
      <td className="py-2 px-4">
        <a href={ensureValidUrl(url.originalUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-500">{url.originalUrl}</a>
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
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition duration-300 ml-2">Save</button>
            <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition duration-300 ml-2">Cancel</button>
          </form>
        ) : (
          <>
            <button onClick={() => onEdit(url)} className="text-blue-500 mr-2">Edit</button>
            <button onClick={() => onDelete(url._id)} className="text-red-500">Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default URLItem;
