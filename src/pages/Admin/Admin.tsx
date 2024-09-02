import React, { useState } from 'react';
import DropdownManagement from './DropdownManagement';
import UserManagement from './UserManagement';
import AuditLogManagement from './AuditLogManagement';
import SystemSettings from './SystemSettings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('DropdownManagement');

  return (
    <div className="p-6">
      <div className="mb-4 flex space-x-4">
        <button
          className={`${
            activeTab === 'DropdownManagement'
              ? 'border-b-2 border-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('DropdownManagement')}
        >
          Dropdown Management
        </button>
        <button
          className={`${
            activeTab === 'UserManagement' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('UserManagement')}
        >
          User Management
        </button>
        <button
          className={`${
            activeTab === 'AuditLogManagement'
              ? 'border-b-2 border-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('AuditLogManagement')}
        >
          Audit Log Management
        </button>
        <button
          className={`${
            activeTab === 'SystemSettings' ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('SystemSettings')}
        >
          System Settings
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'DropdownManagement' && <DropdownManagement />}
        {activeTab === 'UserManagement' && <UserManagement />}
        {activeTab === 'AuditLogManagement' && <AuditLogManagement />}
        {activeTab === 'SystemSettings' && <SystemSettings />}
      </div>
    </div>
  );
};

export default Admin;
