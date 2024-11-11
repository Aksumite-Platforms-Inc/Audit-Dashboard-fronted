import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DropdownManagement: React.FC = () => {
  const [auditTypes, setAuditTypes] = useState<string[]>([]);
  const [newAuditType, setNewAuditType] = useState('');
  const [riskLevels, setRiskLevels] = useState<string[]>([]);
  const [newRiskLevel, setNewRiskLevel] = useState('');
  const [organizationTypes, setOrganizationTypes] = useState<string[]>([]);
  const [newOrganizationType, setNewOrganizationType] = useState('');

  useEffect(() => {
    fetchAuditTypes();
    fetchRiskLevels();
    fetchOrganizationTypes();
  }, []);

  const fetchAuditTypes = async () => {
    try {
      const response = await axios.get('/api/audit-types');
      setAuditTypes(response.data);
    } catch (error) {
      console.error('Error fetching audit types:', error);
    }
  };

  const fetchRiskLevels = async () => {
    try {
      const response = await axios.get('/api/risk-levels');
      setRiskLevels(response.data);
    } catch (error) {
      console.error('Error fetching risk levels:', error);
    }
  };

  const fetchOrganizationTypes = async () => {
    try {
      const response = await axios.get('/api/organization-types');
      setOrganizationTypes(response.data);
    } catch (error) {
      console.error('Error fetching organization types:', error);
    }
  };

  const handleAddAuditType = async () => {
    try {
      await axios.post('/api/audit-types', { auditType: newAuditType });
      fetchAuditTypes();
      setNewAuditType('');
    } catch (error) {
      console.error('Error adding audit type:', error);
    }
  };

  const handleDeleteAuditType = async (type: string) => {
    try {
      await axios.delete(`/api/audit-types/${type}`);
      fetchAuditTypes();
    } catch (error) {
      console.error('Error deleting audit type:', error);
    }
  };

  const handleAddRiskLevel = async () => {
    try {
      await axios.post('/api/risk-levels', { riskLevel: newRiskLevel });
      fetchRiskLevels();
      setNewRiskLevel('');
    } catch (error) {
      console.error('Error adding risk level:', error);
    }
  };

  const handleDeleteRiskLevel = async (level: string) => {
    try {
      await axios.delete(`/api/risk-levels/${level}`);
      fetchRiskLevels();
    } catch (error) {
      console.error('Error deleting risk level:', error);
    }
  };

  const handleAddOrganizationType = async () => {
    try {
      await axios.post('/api/organization-types', {
        organizationType: newOrganizationType,
      });
      fetchOrganizationTypes();
      setNewOrganizationType('');
    } catch (error) {
      console.error('Error adding organization type:', error);
    }
  };

  const handleDeleteOrganizationType = async (type: string) => {
    try {
      await axios.delete(`/api/organization-types/${type}`);
      fetchOrganizationTypes();
    } catch (error) {
      console.error('Error deleting organization type:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Dropdown Options</h2>

      {/* Manage Audit Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Audit Types</h3>
        <ul className="mb-4">
          {auditTypes.map((type) => (
            <li
              key={type}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span>{type}</span>
              <button
                onClick={() => handleDeleteAuditType(type)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
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
            Add
          </button>
        </div>
      </div>

      {/* Manage Risk Levels */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Risk Levels</h3>
        <ul className="mb-4">
          {riskLevels.map((level) => (
            <li
              key={level}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span>{level}</span>
              <button
                onClick={() => handleDeleteRiskLevel(level)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
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
            Add
          </button>
        </div>
      </div>

      {/* Manage Organization Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Organization Types</h3>
        <ul className="mb-4">
          {organizationTypes.map((type) => (
            <li
              key={type}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <span>{type}</span>
              <button
                onClick={() => handleDeleteOrganizationType(type)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownManagement;
