import React from 'react';
import URLItem from './URLItem';

const URLList = ({ urls, onEdit, onDelete, editingUrl, setEditingUrl, newOriginalUrl, setNewOriginalUrl, handleUpdate, handleCancel }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-left text-sm uppercase">
            <th className="py-3 px-6">Short Link</th>
            <th className="py-3 px-6">Original Link</th>
            <th className="py-3 px-6">QR Code</th>
            <th className="py-3 px-6">Clicks</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <URLItem
              key={url._id}
              url={url}
              onEdit={onEdit}
              onDelete={onDelete}
              editingUrl={editingUrl}
              setEditingUrl={setEditingUrl}
              newOriginalUrl={newOriginalUrl}
              setNewOriginalUrl={setNewOriginalUrl}
              handleUpdate={handleUpdate}
              handleCancel={handleCancel}
            />
          ))}
        </tbody>
      </table>
    </div>
  );  
};

export default URLList;
