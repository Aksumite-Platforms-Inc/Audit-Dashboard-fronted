import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [newSettingKey, setNewSettingKey] = useState('');
  const [newSettingValue, setNewSettingValue] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/system-settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    try {
      await axios.put(`/api/system-settings/${key}`, { value });
      fetchSettings();
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  const handleAddSetting = async () => {
    try {
      await axios.post('/api/system-settings', {
        key: newSettingKey,
        value: newSettingValue,
      });
      fetchSettings();
      setNewSettingKey('');
      setNewSettingValue('');
    } catch (error) {
      console.error('Error adding setting:', error);
    }
  };

  const handleDeleteSetting = async (key: string) => {
    try {
      await axios.delete(`/api/system-settings/${key}`);
      fetchSettings();
    } catch (error) {
      console.error('Error deleting setting:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">System Settings</h2>
      <ul className="mb-4">
        {Object.keys(settings).map((key) => (
          <li
            key={key}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span>{key}</span>
            <input
              type="text"
              value={settings[key]}
              onChange={(e) => handleUpdateSetting(key, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={() => handleDeleteSetting(key)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <input
          type="text"
          value={newSettingKey}
          onChange={(e) => setNewSettingKey(e.target.value)}
          placeholder="New setting key"
          className="w-full p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          value={newSettingValue}
          onChange={(e) => setNewSettingValue(e.target.value)}
          placeholder="New setting value"
          className="w-full p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAddSetting}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Setting
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
