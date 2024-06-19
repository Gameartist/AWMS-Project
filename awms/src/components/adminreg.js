// /frontend/src/components/Adminreg.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const Adminreg = () => {
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [capacity, setCapacity] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting location. Please enable geolocation permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(name, radius, latitude, longitude, capacity);
      const response = await axios.post('http://localhost:3001/admin/register', {
        name: name,
        radius: parseFloat(radius),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        capacity: capacity,
      });
      console.log('Geofence registered:', response.data);
      alert('Geofence successfully registered!');
    } catch (error) {
      console.error('Error registering geofence:', error);
      alert('Error registering geofence. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Register Geofence</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Workplace Name</label>
          <input
            id="name"
            type="text"
            placeholder="Workplace Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="radius">Radius (meters)</label>
          <input
            id="radius"
            type="number"
            placeholder="Radius (meters)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Use Current Location
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register Geofence
          </button>
        </div>
      </form>
    </div>
  );
};

export default Adminreg;
