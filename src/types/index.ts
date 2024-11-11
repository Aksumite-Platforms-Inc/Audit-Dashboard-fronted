export type AuditType =
  | 'Cyber Products'
  | 'Network Infrastructure'
  | 'Financial Audit'
  | 'Operational Audit';
// File: src/types/index.ts

// export type AuditType = 'Cyber Products' | 'Network Infrastructure' | 'Compliance';
export type RiskLevel = 'High' | 'Medium' | 'Low';
export type OrganizationType = 'Private' | 'Public';

export interface Audit {
  organization: string;
  auditType: AuditType;
  riskLevel: RiskLevel;
  findings: string;
  recommendations: string;
  auditor: string;
  auditDate: string;
}
