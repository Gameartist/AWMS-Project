// /frontend/src/components/PayrollCalculator.js
import React, { useState } from 'react';

const PayrollCalculator = () => 
    {
  const [studentId, setStudentId] = useState('');
  const [hoursWorked, setHoursWorked] = useState(0);
  const [rate, setRate] = useState(0);
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/payroll/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, hoursWorked, rate }),
    });
    const data = await response.json();
    console.log(data);

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      <input type="number" placeholder="Hours Worked" value={hoursWorked}/>
      </form></div>
  )
};

export default PayrollCalculator;

