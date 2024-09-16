import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to Add User page

// Dummy user data
const dummyUsers = [
  { id: '1', name: 'John Doe', role: 'Admin', email: 'john@example.com', expertise: 'Forensic' },
  { id: '2', name: 'Jane Smith', role: 'Expert', email: 'jane@example.com', expertise: 'Malware Analysis' },
  { id: '3', name: 'Mike Brown', role: 'Viewer', email: 'mike@example.com', expertise: 'Network Security' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(dummyUsers); // Set initial state with dummy data
  const [editUser, setEditUser] = useState<any | null>(null); // User being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const navigate = useNavigate(); // For navigation

  // Handle delete user
  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id); // Remove user by ID
    setUsers(updatedUsers); // Update state
  };

  // Open edit modal
  const handleEditUser = (user: any) => {
    setEditUser(user); // Set user for editing
    setShowModal(true); // Show modal
  };

  // Update user details
  const handleSaveUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === editUser.id ? editUser : u))
    );
    setShowModal(false); // Hide modal after save
  };

  // Navigate to Add User page
  const handleNavigateToAddUser = () => {
    navigate('/add-user');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="mt-2">
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Expertise:</strong> {user.expertise}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleEditUser(user)}
                className="text-blue-500 hover:text-blue-700 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Button */}
      <button
        onClick={handleNavigateToAddUser}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add User
      </button>

      {/* Edit User Modal */}
      {showModal && editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Expertise</label>
              <input
                type="text"
                value={editUser.expertise}
                onChange={(e) => setEditUser({ ...editUser, expertise: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveUser}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
