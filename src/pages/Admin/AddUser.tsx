import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Role field (admin/expert)
  const [expertise, setExpertise] = useState(''); // Expertise field for experts
  const navigate = useNavigate();

  // Handle the addition of a new user
  const handleAddUser = () => {
    const newUser = {
      id: Math.random().toString(),
      name,
      email,
      role,
      expertise: role === 'Expert' ? expertise : 'N/A', // Only include expertise if the user is an Expert
    };
    console.log('New User:', newUser); // Simulate API call here

    // Simulate navigating back to user list after adding user
    navigate('/');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      {/* Conditionally render the expertise field if the role is Expert */}
      {role === 'Expert' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Expertise</label>
          <select
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Expertise</option>
            <option value="Forensic">Forensic</option>
            <option value="Malware Analysis">Malware Analysis</option>
            <option value="Network Security">Network Security</option>
            <option value="Incident Response">Incident Response</option>
          </select>
        </div>
      )}

      <button
        onClick={handleAddUser}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUser;
