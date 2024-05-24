// /frontend/src/components/AttendanceLogger.js
import React, { useState } from 'react';

const AttendanceLogger = () => {
  const [studentId, setStudentId] = useState('');
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [signInTime, setSignInTime] = useState(new Date());
  const [signOutTime, setSignOutTime] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/attendance/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, signInTime, signOutTime, coordinates }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      <input type="datetime-local" value={signInTime.toISOString().slice(0, 16)} onChange={(e) => setSignInTime(new Date(e.target.value))} />
      <input type="datetime-local" value={signOutTime.toISOString().slice(0, 16)} onChange={(e) => setSignOutTime(new Date(e.target.value))} />
      <button type="submit">Log Attendance</button>
    </form>
  );
};

export default AttendanceLogger;
