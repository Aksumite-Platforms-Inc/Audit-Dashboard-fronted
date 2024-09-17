import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdowns/Dropdown';
import { AuditType, OrganizationType } from '../../types';
import { addAudit, fetchAuditors } from '../../api/AuditApi';

const NewAudit: React.FC = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState('');
  const [auditType, setAuditType] = useState<AuditType | null>(null);
  const [organizationType, setOrganizationType] = useState<OrganizationType | null>(null);
  const [auditor, setAuditor] = useState('');
  const [auditors, setAuditors] = useState<string[]>([]);

  useEffect(() => {
    const loadAuditors = async () => {
      try {
        const fetchedAuditors = await fetchAuditors();
        setAuditors(fetchedAuditors);
      } catch (error) {
        console.error('Failed to fetch auditors:', error);
      }
    };

    loadAuditors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!organization || !auditType || !auditor || !organizationType) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addAudit({
        organization,
        organizationType,
        auditType,
        auditor,
      });

      navigate('/audit-overview');
    } catch (error) {
      console.error('Failed to add audit:', error);
      alert('Failed to add audit. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Audit</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Organization Name</label>
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter organization name"
          />
        </div>

        <div className="mb-4">
          <Dropdown
            label="Organization Type"
            options={['Private', 'Governmental']}
            onChange={(value: string) => setOrganizationType(value as OrganizationType)}
            value={organizationType || ''}
          />
        </div>

        <div className="mb-4">
          <Dropdown
            label="Audit Type"
            options={['WebSite', 'Network Infrastructure', 'Mobile Application']}
            onChange={(value: string) => setAuditType(value as AuditType)}
            value={auditType || ''}
          />
        </div>

        <div className="mb-4">
          <Dropdown
            label="Auditor"
            options={auditors}
            onChange={(value: string) => setAuditor(value)}
            value={auditor}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewAudit;
