// /frontend/src/components/StudentRegistration.js
import React, { useState } from 'react';

const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [workOptions, setWorkOptions] = useState(['', '', '']);
  const [imei, setImei] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/students/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, studentId, workOptions}),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleWorkOptionChange = (index, value) => {
    const newWorkOptions = [...workOptions];
    newWorkOptions[index] = value;
    setWorkOptions(newWorkOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      <input type="text" placeholder="Work Option 1" value={workOptions[0]} onChange={(e) => handleWorkOptionChange(0, e.target.value)} />
      <input type="text" placeholder="Work Option 2" value={workOptions[1]} onChange={(e) => handleWorkOptionChange(1, e.target.value)} />
      <input type="text" placeholder="Work Option 3" value={workOptions[2]} onChange={(e) => handleWorkOptionChange(2, e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentRegistration;
