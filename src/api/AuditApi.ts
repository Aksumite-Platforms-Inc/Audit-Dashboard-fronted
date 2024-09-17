// api/AuditApi.ts
import axios from 'axios';

interface GovAuditData {
  id: number;
  organization: string;
  organizationType: string;
  auditType: string;
  riskLevel: string;
  findings: string;
  recommendations: string;
  auditor: string;
  date: string; // ISO date string
  governmentType: string;
}

interface PriAuditData {
  id: number;
  organization: string;
  organizationType: string;
  auditType: string;
  riskLevel: string;
  findings: string;
  recommendations: string;
  auditor: string;
  date: string; // ISO date string
  privateType: string;
}

export const fetchGovernmentAudits = async (token: string): Promise<GovAuditData[]> => {
  const response = await axios.get('http://localhost:8081/api/governmentaudits/getall', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchPrivateAudits = async (token: string): Promise<PriAuditData[]> => {
  const response = await axios.get('http://localhost:8081/api/privateaudits/getall', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

// api/audit.ts
import { AuditType, OrganizationType } from '../types';

interface NewAuditData {
  organization: string;
  organizationType: OrganizationType;
  auditType: AuditType;
  auditor: string;
}

export const addAudit = async (auditData: NewAuditData): Promise<void> => {
  const response = await fetch('http://localhost:8081/api/audits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(auditData),
  });

  if (!response.ok) {
    throw new Error('Failed to add audit');
  }
};

export const fetchAuditors = async (): Promise<string[]> => {
  const response = await fetch('http://localhost:8081/api/users?role=expert', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch auditors');
  }

  const auditors = await response.json();
  return auditors.map((auditor: { name: string }) => auditor.name);
};