// src/components/NavTabs.jsx
import React from 'react';

const NavTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 bg-gray-800 p-4">
      <button onClick={() => setActiveTab('shorten')} className={`text-white ${activeTab === 'shorten' ? 'border-b-2 border-blue-500' : ''}`}>Shorten URL</button>
      <button onClick={() => setActiveTab('history')} className={`text-white ${activeTab === 'history' ? 'border-b-2 border-blue-500' : ''}`}>History</button>
    </div>
  );
};

export default NavTabs;
