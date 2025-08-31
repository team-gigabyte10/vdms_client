import React, { useState } from 'react';
import Sidebar from './Layout/Sidebar';
import Header from './Layout/Header';
import Dashboard from './Dashboard/Dashboard';
import VoterManagement from './Voters/VoterManagement';
import ExcelOperations from './Excel/ExcelOperations';
import VoterSlips from './VoterSlips/VoterSlips';
import CenterManagement from './Centers/CenterManagement';
import Settings from './Settings/Settings';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'voters': return 'Voter Management';
      case 'excel': return 'Excel Operations';
      case 'slips': return 'Voter Slips';
      case 'centers': return 'Centers & Booths';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'voters': return <VoterManagement />;
      case 'excel': return <ExcelOperations />;
      case 'slips': return <VoterSlips />;
      case 'centers': return <CenterManagement />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MainApp;