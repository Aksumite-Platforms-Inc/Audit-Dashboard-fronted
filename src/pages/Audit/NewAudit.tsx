import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdowns/Dropdown';
import { AuditType, RiskLevel, OrganizationType } from '../../types';

const NewAudit: React.FC = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState('');
  const [auditType, setAuditType] = useState<AuditType | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null);
  const [organizationType, setOrganizationType] =
    useState<OrganizationType | null>(null);
  const [findings, setFindings] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [auditor, setAuditor] = useState('');
  const [auditDate, setAuditDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !organization ||
      !auditType ||
      !riskLevel ||
      !findings ||
      !recommendations ||
      !auditor ||
      !auditDate ||
      !organizationType
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Handle form submission (e.g., API call to save the audit)
    console.log({
      organization,
      organizationType,
      auditType,
      riskLevel,
      findings,
      recommendations,
      auditor,
      auditDate,
    });

    navigate('/audit-overview');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Audit</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Organization</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <Dropdown
            label="Organization Type"
            options={['Private', 'Public']}
            onChange={(value: string) =>
              setOrganizationType(value as OrganizationType)
            }
            value={''}
          />
        </div>

        <div className="mb-4">
          <Dropdown
            label="Audit Type"
            options={['Cyber Products', 'Network Infrastructure', 'Compliance']}
            onChange={(value: string) => setAuditType(value as AuditType)}
            value={''}
          />
        </div>

        <div className="mb-4">
          <Dropdown
            label="Risk Level"
            options={['High', 'Medium', 'Low']}
            onChange={(value: string) => setRiskLevel(value as RiskLevel)}
            value={''}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Findings</label>
          <textarea
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Recommendations</label>
          <textarea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Auditor</label>
          <input
            type="text"
            value={auditor}
            onChange={(e) => setAuditor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Audit Date</label>
          <input
            type="date"
            value={auditDate}
            onChange={(e) => setAuditDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewAudit;
