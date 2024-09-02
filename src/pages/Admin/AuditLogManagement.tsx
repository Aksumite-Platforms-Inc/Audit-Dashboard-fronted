import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLogManagement: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/audit-logs');
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }
  };

  const handleDeleteLog = async (id: string) => {
    try {
      await axios.delete(`/api/audit-logs/${id}`);
      fetchLogs();
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Audit Log Management</h2>
      <ul className="mb-4">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span>{log.action}</span>
            <span>{new Date(log.timestamp).toLocaleString()}</span>
            <button
              onClick={() => handleDeleteLog(log.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditLogManagement;
