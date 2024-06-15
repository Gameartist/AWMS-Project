// /frontend/src/components/AttendanceLogger.js
import React, { useState } from 'react';
import axios from 'axios';
const AttendanceLogger = () => 
{
  const [studentId, setStudentId] = useState('');
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [signInTime, setSignInTime] = useState(new Date());
  const [signOutTime, setSignOutTime] = useState(new Date());

  const getLocation = () =>
  {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        setCoordinates([position.coords.latitude, position.coords.longitude]);
      }, error => {
        console.error("Error getting location: ", error);
      });
    } 
    else 
    {
      alert("Geolocation is not supported by this browser.");
    }
  };
  


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/attendance/log', { studentId, signInTime, signOutTime, coordinates })
    const data = response.data;
    console.log(data);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <button on onClick={getLocation}>Get current location</button>
      <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      <input type="datetime-local" value={signInTime.toISOString().slice(0, 16)} onChange={(e) => setSignInTime(new Date(e.target.value))} />
      <input type="datetime-local" value={signOutTime.toISOString().slice(0, 16)} onChange={(e) => setSignOutTime(new Date(e.target.value))} />
      <button type="submit">Log Attendance</button>
    </form>
    {coordinates[0] !== 0 && coordinates[1] !== 0 && (
        <p>Current Location: Latitude {coordinates[0]}, Longitude {coordinates[1]}</p>
      )}
    </div>
  );
};

export default AttendanceLogger;
