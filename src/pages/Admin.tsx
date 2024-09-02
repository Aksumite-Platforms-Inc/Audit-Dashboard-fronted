import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [auditTypes, setAuditTypes] = useState<string[]>([
    'Cyber Products',
    'Network Infrastructure',
    'Compliance',
  ]);
  const [riskLevels, setRiskLevels] = useState<string[]>([
    'High',
    'Medium',
    'Low',
  ]);
  const [projectTypes, setProjectTypes] = useState<string[]>([
    'Internal',
    'External',
  ]);
  const [organizationTypes, setOrganizationTypes] = useState<string[]>([
    'Private',
    'Public',
  ]);

  const [newAuditType, setNewAuditType] = useState('');
  const [newRiskLevel, setNewRiskLevel] = useState('');
  const [newProjectType, setNewProjectType] = useState('');
  const [newOrganizationType, setNewOrganizationType] = useState('');

  const handleAddItem = (
    listSetter: React.Dispatch<React.SetStateAction<string[]>>,
    newItem: string,
    setNewItem: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (newItem.trim() !== '') {
      listSetter((prev) => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (
    listSetter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    listSetter((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>

      <div className="mb-6">
        <h3 className="text-xl mb-4">Manage Audit Types</h3>
        <div className="mb-4">
          <input
            type="text"
            value={newAuditType}
            onChange={(e) => setNewAuditType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Add new audit type"
          />
          <button
            onClick={() =>
              handleAddItem(setAuditTypes, newAuditType, setNewAuditType)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul>
          {auditTypes.map((type, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{type}</span>
              <button
                onClick={() => handleRemoveItem(setAuditTypes, type)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl mb-4">Manage Risk Levels</h3>
        <div className="mb-4">
          <input
            type="text"
            value={newRiskLevel}
            onChange={(e) => setNewRiskLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Add new risk level"
          />
          <button
            onClick={() =>
              handleAddItem(setRiskLevels, newRiskLevel, setNewRiskLevel)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul>
          {riskLevels.map((level, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{level}</span>
              <button
                onClick={() => handleRemoveItem(setRiskLevels, level)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl mb-4">Manage Project Types</h3>
        <div className="mb-4">
          <input
            type="text"
            value={newProjectType}
            onChange={(e) => setNewProjectType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Add new project type"
          />
          <button
            onClick={() =>
              handleAddItem(setProjectTypes, newProjectType, setNewProjectType)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul>
          {projectTypes.map((type, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{type}</span>
              <button
                onClick={() => handleRemoveItem(setProjectTypes, type)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl mb-4">Manage Organization Types</h3>
        <div className="mb-4">
          <input
            type="text"
            value={newOrganizationType}
            onChange={(e) => setNewOrganizationType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Add new organization type"
          />
          <button
            onClick={() =>
              handleAddItem(
                setOrganizationTypes,
                newOrganizationType,
                setNewOrganizationType,
              )
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul>
          {organizationTypes.map((type, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{type}</span>
              <button
                onClick={() => handleRemoveItem(setOrganizationTypes, type)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
