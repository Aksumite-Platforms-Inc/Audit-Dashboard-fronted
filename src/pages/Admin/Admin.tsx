import React, { useState } from 'react';
import DropdownManagement from './DropdownManagement';
import UserManagement from './UserManagement';
import AuditLogManagement from './AuditLogManagement';
import SystemSettings from './SystemSettings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dropdown');

  const renderContent = () => {
    switch (activeTab) {
      case 'dropdown':
        return <DropdownManagement />;
      case 'user':
        return <UserManagement />;
      case 'auditlog':
        return <AuditLogManagement />;
      case 'system':
        return <SystemSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('dropdown')}
          className={`py-2 px-4 ${
            activeTab === 'dropdown' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          Dropdown Management
        </button>
        <button
          onClick={() => setActiveTab('user')}
          className={`py-2 px-4 ${
            activeTab === 'user' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('auditlog')}
          className={`py-2 px-4 ${
            activeTab === 'auditlog' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          Audit Log Management
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`py-2 px-4 ${
            activeTab === 'system' ? 'border-b-2 border-blue-500' : ''
          }`}
        >
          System Settings
        </button>
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Admin;
