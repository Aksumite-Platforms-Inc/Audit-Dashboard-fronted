import { useState } from 'react';

const [showModal, setShowModal] = useState(false);
const [activeTab, setActiveTab] = useState('Private');

const Tabs = () => (
  <div className="flex mb-4">
    <button
      className={`px-4 py-2 ${
        activeTab === 'Private' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
      onClick={() => setActiveTab('Private')}
    >
      Private
    </button>
    <button
      className={`px-4 py-2 ${
        activeTab === 'Governmental' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
      onClick={() => setActiveTab('Governmental')}
    >
      Governmental
    </button>
  </div>
);
const Form = () => (
  <form>
    <div className="mb-4">
      <label className="block text-gray-700">ID</label>
      <input type="text" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Organization</label>
      <input type="text" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Name</label>
      <input type="text" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Recommendations</label>
      <input type="text" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Auditor</label>
      <input type="text" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Date</label>
      <input type="date" className="w-full px-3 py-2 border rounded" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Project Type</label>
      <input type="text" className="w-full px-3 py-2 border rounded" />
    </div>
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
      Submit
    </button>
  </form>
);
const Modal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 h-3/4 overflow-y-auto p-4 rounded">
        <button className="absolute top-2 right-2" onClick={onClose}>
          Close
        </button>
        {/* Tabs and Form will go here */}
      </div>
    </div>
  );
};
