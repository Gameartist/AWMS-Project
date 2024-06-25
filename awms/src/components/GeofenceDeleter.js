// /frontend/src/components/DeleteGeofence.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';  // Ensure to add appropriate styles

const DeleteGeofence = () => {
  const [projectId, setProjectId] = useState('');
  const [fenceId, setFenceId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!projectId || !fenceId) {
      setStatusMessage('Please provide both Project ID and Fence ID.');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:3001/geofence/delete', {
        data: { projectId, fenceId }
      });
      if (response.data.message) {
        setStatusMessage('Geofence successfully deleted!');
      } else {
        setStatusMessage('Failed to delete geofence. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting geofence:', error);
      setStatusMessage('Error deleting geofence. Please check the IDs and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleDelete} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Delete Geofence</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectId">Project ID</label>
          <input
            id="projectId"
            type="text"
            placeholder="Enter Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fenceId">Fence ID</label>
          <input
            id="fenceId"
            type="text"
            placeholder="Enter Fence ID"
            value={fenceId}
            onChange={(e) => setFenceId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Delete Geofence
        </button>
        {statusMessage && (
          <p className="mt-4 text-center text-red-600">{statusMessage}</p>
        )}
      </form>
    </div>
  );
};

export default DeleteGeofence;
