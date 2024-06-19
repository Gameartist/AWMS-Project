// /frontend/src/components/StudentRegistration.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [workPlaces, setWorkPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/students/assign', {
        name,
        password,
        studentId,
        workOptions: selectedPlaces,
      });
      const data = response.data;
      if (data.message) {
        alert(`Assigned Workplace: ${data.place}`);
        window.location.href = '/login';
      }
      console.log(data);
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/students/getallworkplaces')
      .then((res) => {
        setWorkPlaces(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching workplaces:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form 
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full" 
        onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Student Registration</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input 
            id="name"
            type="text" 
            placeholder="Enter your name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">Student ID</label>
          <input 
            id="studentId"
            type="text" 
            placeholder="Enter your student ID" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workplace">Select Workplaces</label>
          <select 
            id="workplace"
            onChange={(e) => {
              if (e.target.value !== 'none') {
                setSelectedPlaces([...selectedPlaces, e.target.value]);
              }
            }} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="none">Select a workplace</option>
            {workPlaces.map((place, index) => (
              place !== null && place.capacity !== 0 && !selectedPlaces.includes(place.name) && (
                <option key={index} value={place.name}>{place.name}</option>
              )
            ))}
          </select>
        </div>
        <div className="mb-6">
          {selectedPlaces.map((item, index) => (
            <div key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full inline-block m-1">{item}</div>
          ))}
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
