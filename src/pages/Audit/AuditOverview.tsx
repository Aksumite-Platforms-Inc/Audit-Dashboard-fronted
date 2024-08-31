import React, { useState } from 'react';
import Dropdown from '../../components/Dropdowns/Dropdown';
import { AuditType, RiskLevel, OrganizationType, Audit } from '../../types';

const AuditOverview: React.FC = () => {
  const [selectedAuditType, setSelectedAuditType] = useState<AuditType | ''>(
    '',
  );
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<RiskLevel | ''>(
    '',
  );
  const [selectedOrgType, setSelectedOrgType] = useState<OrganizationType | ''>(
    '',
  );

  const audits: Audit[] = [
    // Example data, replace with actual data
    {
      organization: 'Org A',
      auditType: 'Cyber Products',
      riskLevel: 'High',
      findings: 'Issues',
      recommendations: 'Updates',
      auditor: 'Auditor 1',
      auditDate: '2024-01-01',
    },
    // More audit records...
  ];

  const filteredAudits = audits.filter((audit) => {
    return (
      (selectedAuditType === '' || audit.auditType === selectedAuditType) &&
      (selectedRiskLevel === '' || audit.riskLevel === selectedRiskLevel) &&
      (selectedOrgType === '' || audit.organization.includes(selectedOrgType))
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Audit Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Dropdown
          label="Audit Type"
          options={[
            '',
            'Cyber Products',
            'Network Infrastructure',
            'Financial Audit',
            'Operational Audit',
          ]}
          value={selectedAuditType}
          onChange={(value) => setSelectedAuditType(value as AuditType)}
        />
        <Dropdown
          label="Risk Level"
          options={['', 'Low', 'Medium', 'High']}
          value={selectedRiskLevel}
          onChange={(value) => setSelectedRiskLevel(value as RiskLevel)}
        />
        <Dropdown
          label="Organization Type"
          options={['', 'Private', 'Public']}
          value={selectedOrgType}
          onChange={(value) => setSelectedOrgType(value as OrganizationType)}
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">Organization</th>
            <th className="border-b py-2 text-left">Audit Type</th>
            <th className="border-b py-2 text-left">Risk Level</th>
            <th className="border-b py-2 text-left">Findings</th>
            <th className="border-b py-2 text-left">Recommendations</th>
            <th className="border-b py-2 text-left">Auditor</th>
            <th className="border-b py-2 text-left">Audit Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredAudits.map((audit, index) => (
            <tr key={index}>
              <td className="py-2">{audit.organization}</td>
              <td className="py-2">{audit.auditType}</td>
              <td className="py-2">{audit.riskLevel}</td>
              <td className="py-2">{audit.findings}</td>
              <td className="py-2">{audit.recommendations}</td>
              <td className="py-2">{audit.auditor}</td>
              <td className="py-2">{audit.auditDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditOverview;
