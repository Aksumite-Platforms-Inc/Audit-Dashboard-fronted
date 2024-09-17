import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { auditData } from '../../components/Tables/OrganizationAuditTable'; // Replace with your data source

const COLORS = ['#FF8042', '#FFBB28', '#00C49F'];

const AuditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const audit = auditData.find((audit) => audit.id === parseInt(id || '')); // Find the audit by ID

  const [auditStatus, setAuditStatus] = useState(audit?.status || 'Pending');
  const [findings, setFindings] = useState(audit?.findings || '');
  const [recommendations, setRecommendations] = useState(audit?.recommendations || '');
  const [completion, setCompletion] = useState(audit?.completion || 0);
  const [documents, setDocuments] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>(audit?.links || []); // Manage audit project links
  const [newLink, setNewLink] = useState('');
  const [lastUpdated, setLastUpdated] = useState(audit?.lastUpdated || new Date().toLocaleString());

  // State for risk level distribution (Pie Chart Data)
  const [riskDistribution, setRiskDistribution] = useState({
    high: audit?.riskLevel?.high || 0,
    medium: audit?.riskLevel?.medium || 0,
    low: audit?.riskLevel?.low || 0,
  });

  // Placeholder for team members
  const teamMembers = audit?.teamMembers || [];

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  // Handle adding a new link
  const handleAddLink = () => {
    if (newLink) {
      setLinks([...links, newLink]);
      setNewLink(''); // Reset the input field
    }
  };

  // Handle removing a link
  const handleRemoveLink = (link: string) => {
    setLinks(links.filter((l) => l !== link));
  };

  // Handle audit updates (Mock backend save)
  const handleUpdate = () => {
    alert('Audit updated successfully!');
    setLastUpdated(new Date().toLocaleString()); // Mock last updated time
    navigate('/audit-overview');
  };

  const handleRiskInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'high' | 'medium' | 'low') => {
    setRiskDistribution({
      ...riskDistribution,
      [type]: parseInt(e.target.value),
    });
  };

  if (!audit) {
    return <p className="text-center text-lg text-gray-600 mt-10">No audit found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10 dark:bg-gray-800">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Audit: {audit.organization}</h2>
        <select
          value={auditStatus}
          onChange={(e) => setAuditStatus(e.target.value)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          title="Audit Status"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-8">
        {/* Audit Information */}
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">Audit Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-300"><strong>Audit Type:</strong> {audit.auditType}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Auditor:</strong> {audit.auditor}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Audit Date:</strong> {audit.auditDate}</p>
              <p className="text-gray-600 dark:text-gray-300"><strong>Last Updated:</strong> {lastUpdated}</p>
            </div>

            <div>
              {/* Risk Level Chart */}
              <h4 className="text-lg font-semibold mb-2">Risk Level Distribution</h4>
              <div className="flex gap-4 mb-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">High Risk</label>
                  <input
                    type="number"
                    min="0"
                    value={riskDistribution.high}
                    onChange={(e) => handleRiskInputChange(e, 'high')}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    title="High Risk"
                    placeholder="Enter high risk value"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Medium Risk</label>
                  <input
                    type="number"
                    min="0"
                    value={riskDistribution.medium}
                    onChange={(e) => handleRiskInputChange(e, 'medium')}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    title="Medium Risk"
                    placeholder="Enter medium risk value"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Low Risk</label>
                  <input
                    type="number"
                    min="0"
                    value={riskDistribution.low}
                    onChange={(e) => handleRiskInputChange(e, 'low')}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    title="Low Risk"
                    placeholder="Enter low risk value"
                  />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'High', value: riskDistribution.high },
                      { name: 'Medium', value: riskDistribution.medium },
                      { name: 'Low', value: riskDistribution.low },
                    ]}
                    dataKey="value"
                    outerRadius={80}
                    innerRadius={40}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">Completion Status</h3>
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600 dark:text-gray-300">Completion: {completion}%</p>
            <input
              type="range"
              min="0"
              max="100"
              value={completion}
              onChange={(e) => setCompletion(parseInt(e.target.value))}
              className="w-2/3 h-2 rounded-lg appearance-none bg-gray-300"
              title="Completion Status"
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className="bg-green-500 h-3 rounded-full completion-bar"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>

        {/* Findings & Recommendations */}
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">Findings & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Findings */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Findings</label>
              <textarea
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                rows={4}
                title="Findings"
                placeholder="Enter findings"
              ></textarea>
            </div>

            {/* Recommendations */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Recommendations</label>
              <textarea
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                rows={4}
                title="Recommendations"
                placeholder="Enter recommendations"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">Documents & Resources</h3>
          <input
            type="file"
            multiple
            onChange={handleDocumentUpload}
            className="mt-2 w-full p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
            title="Upload Documents"
          />
          <ul className="mt-4 space-y-2">
            {documents.map((doc, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">
                {doc.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Links Section */}
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4 text-gray-800 dark:text-white">Related Links</h3>
          <div className="flex space-x-4 mb-4">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:text-white"
              placeholder="Enter URL"
            />
            <button
              onClick={handleAddLink}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              add
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            {links.map((link, index) => (
              <li key={index} className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                  {link}
                </a>
                <button
                  onClick={() => handleRemoveLink(link)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-right">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditDetails;
