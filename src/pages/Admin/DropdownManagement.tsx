import React, { useState } from 'react';

const DropdownManagement: React.FC = () => {
  const [newAuditType, setNewAuditType] = useState('');
  const [newRiskLevel, setNewRiskLevel] = useState('');
  const [newOrganizationType, setNewOrganizationType] = useState('');

  const handleAddAuditType = () => {
    // Logic to add a new audit type
    console.log('Adding new audit type:', newAuditType);
    setNewAuditType('');
  };

  const handleAddRiskLevel = () => {
    // Logic to add a new risk level
    console.log('Adding new risk level:', newRiskLevel);
    setNewRiskLevel('');
  };

  const handleAddOrganizationType = () => {
    // Logic to add a new organization type
    console.log('Adding new organization type:', newOrganizationType);
    setNewOrganizationType('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Dropdown Options</h2>

      {/* Manage Audit Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Audit Types</h3>
        <ul className="mb-4">
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Cyber Products</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Network Infrastructure</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Compliance</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
        </ul>
        <div className="flex items-center">
          <input
            type="text"
            value={newAuditType}
            onChange={(e) => setNewAuditType(e.target.value)}
            placeholder="Add new audit type"
            className="w-full p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddAuditType}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Audit Type
          </button>
        </div>
      </div>

      {/* Manage Risk Levels */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Risk Levels</h3>
        <ul className="mb-4">
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>High</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Medium</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Low</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
        </ul>
        <div className="flex items-center">
          <input
            type="text"
            value={newRiskLevel}
            onChange={(e) => setNewRiskLevel(e.target.value)}
            placeholder="Add new risk level"
            className="w-full p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddRiskLevel}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Risk Level
          </button>
        </div>
      </div>

      {/* Manage Organization Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Organization Types</h3>
        <ul className="mb-4">
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Private</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Public</span>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </li>
        </ul>
        <div className="flex items-center">
          <input
            type="text"
            value={newOrganizationType}
            onChange={(e) => setNewOrganizationType(e.target.value)}
            placeholder="Add new organization type"
            className="w-full p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddOrganizationType}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Organization Type
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownManagement;
