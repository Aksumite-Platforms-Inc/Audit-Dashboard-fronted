import React from 'react';

const UserManagement: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <ul>
        <li className="flex justify-between items-center py-2 border-b border-gray-200">
          <span>John Doe - Administrator</span>
          <button className="text-red-500 hover:text-red-700">Remove</button>
        </li>
        <li className="flex justify-between items-center py-2 border-b border-gray-200">
          <span>Jane Smith - Auditor</span>
          <button className="text-red-500 hover:text-red-700">Remove</button>
        </li>
      </ul>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
