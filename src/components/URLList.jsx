import React from 'react';
import URLItem from './URLItem';

const URLList = ({ urls, onEdit, onDelete, editingUrl, setEditingUrl, newOriginalUrl, setNewOriginalUrl, handleUpdate, handleCancel }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
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
