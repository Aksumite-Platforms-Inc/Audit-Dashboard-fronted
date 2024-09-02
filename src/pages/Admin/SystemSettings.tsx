import React from 'react';

const SystemSettings: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">System Settings</h2>
      <div className="mb-4">
        <label className="block mb-2">Notification Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Audit Reminder Frequency</label>
        <select className="w-full p-2 border border-gray-300 rounded">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Quarterly</option>
        </select>
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
