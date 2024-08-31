import React from 'react';
import { Link } from 'react-router-dom';

const AuditAssignments: React.FC = () => {
  const assignments = [
    // Example data - replace with actual data fetched from your backend
    {
      id: 1,
      audit: 'Cyber Products Review',
      auditor: 'John Doe',
      role: 'Lead Auditor',
    },
    // Additional assignment records...
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Audit Assignments & Roles</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">Audit</th>
            <th className="border-b py-2 text-left">Auditor</th>
            <th className="border-b py-2 text-left">Role</th>
            <th className="border-b py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="py-2">{assignment.audit}</td>
              <td className="py-2">{assignment.auditor}</td>
              <td className="py-2">{assignment.role}</td>
              <td className="py-2">
                <Link
                  to={`/audit/assignments/${assignment.id}`}
                  className="text-blue-500"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditAssignments;
