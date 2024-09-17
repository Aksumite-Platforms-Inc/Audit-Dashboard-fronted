import React from 'react';
import { Link } from 'react-router-dom';

const ManageAuditProjects: React.FC = () => {
  const projects = [
    // Example data - replace with actual data fetched from your backend
    {
      id: 1,
      name: 'Project A',
      auditors: 'John Doe',
      status: 'Ongoing',
      deadline: '2024-01-31',
    },
    // Additional project records...
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Audit Projects</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">Project Name</th>
            <th className="border-b py-2 text-left">Auditors</th>
            <th className="border-b py-2 text-left">Status</th>
            <th className="border-b py-2 text-left">Deadline</th>
            <th className="border-b py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="py-2">{project.name}</td>
              <td className="py-2">{project.auditors}</td>
              <td className="py-2">{project.status}</td>
              <td className="py-2">{project.deadline}</td>
              <td className="py-2">
                <Link
                  to={`/audit/projects/${project.id}`}
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

export default ManageAuditProjects;
