import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('/api/users', { name: newUser, role });
      fetchUsers();
      setNewUser('');
      setRole('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <ul className="mb-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span>{user.name}</span>
            <span>{user.role}</span>
            <button
              onClick={() => handleDeleteUser(user.id)}
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
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Add new user"
          className="w-full p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="w-full p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
