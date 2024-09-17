export type AUDIT = {
    organization: string;
    auditType: string;
    riskLevel: string;
    findings: string;
    recommendations: string;
    auditor: string;
    auditDate: string;
    lastUpdated: String;
    status: string;
    completion: Int32Array;
    links: string;
}