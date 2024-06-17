// /frontend/src/components/PayrollCalculator.js
import React, { useState } from 'react';
import axios from 'axios';

const PayrollCalculator = () => {
  const [studentId, setStudentId] = useState('');
  const [report, setReport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/payroll/calculate', {
        studentId
      });

      setReport(response.data);
    } catch (error) {
      console.error('Error generating payroll:', error);
      alert('Failed to generate payroll. Please try again.');
    }
  };

  return (
    <div>
      <h2>Payroll Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <button type="submit">Calculate Payroll</button>
      </form>
      {report && (
        <div>
          <h3>Payroll Report</h3>
          <p>Student ID: {report.studentId}</p>
          <p>Hours Worked: {report.hoursWorked.toFixed(2)}</p>
          <p>Rate: N{report.rate.toFixed(2)}</p>
          <p>Total Payment: N{report.totalPayment.toFixed(2)}</p>
          <p>Report Date: {new Date(report.reportDate).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default PayrollCalculator;
