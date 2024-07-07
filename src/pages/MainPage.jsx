// src/pages/MainPage.jsx
import React, { useState } from 'react';
import NavTabs from '../components/NavTabs';
import ShortenUrlPage from './ShortenUrlPage';
import HistoryPage from './HistoryPage';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('shorten');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-8">
        {activeTab === 'shorten' && <ShortenUrlPage />}
        {activeTab === 'history' && <HistoryPage />}
      </div>
    </div>
  );
};

export default MainPage;
