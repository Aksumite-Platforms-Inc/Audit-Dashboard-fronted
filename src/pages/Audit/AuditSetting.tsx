import React, { useState } from 'react';

const AuditSettings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveSettings = () => {
    // Save settings to backend or localStorage
    console.log('Settings saved.');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Audit Settings</h2>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="mr-2"
          />
          Enable Notifications
        </label>
      </div>

      <button
        onClick={handleSaveSettings}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default AuditSettings;
