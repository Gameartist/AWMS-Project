// /frontend/src/components/PayrollCalculator.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Payroll Calculator</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Calculate Payroll
          </button>
        </form>
        {report && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Payroll Report</h3>
            <p><span className="font-semibold">Student ID:</span> {report.studentId}</p>
            <p><span className="font-semibold">Hours Worked:</span> {report.hoursWorked.toFixed(2)}</p>
            <p><span className="font-semibold">Rate:</span> N{report.rate.toFixed(2)}</p>
            <p><span className="font-semibold">Total Payment:</span> N{report.totalPayment.toFixed(2)}</p>
            <p><span className="font-semibold">Report Date:</span> {new Date(report.reportDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollCalculator;
