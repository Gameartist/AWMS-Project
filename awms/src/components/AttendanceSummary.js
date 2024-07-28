// /frontend/src/components/AttendanceSummary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AttendanceSummary = () => {
  const [studentId] = useState(sessionStorage.getItem('studentid'));
  const [studentName, setStudentName] = useState('');
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (studentId) {
      axios.post('http://localhost:3001/attendance/summary', { studentId })
        .then(response => {
          setStudentName(response.data.studentName);
          setSummary(response.data.summary);
        })
        .catch(error => {
          console.error('Error fetching attendance summary:', error);
          setError('Failed to load attendance summary. Please try again.');
        });
    } else {
      setError('Student ID not found.');
    }
  }, [studentId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Attendance Summary</h2>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div>
            <h3 className="text-lg font-bold mb-2">Student: {studentName}</h3>
            <ul className="list-disc list-inside">
              {summary.map((record, index) => (
                <li key={index} className="mb-2">
                  <strong>Date:</strong> {new Date(record.date).toLocaleDateString()} - 
                  <strong> Hours:</strong> {(record.totalAttendanceTime / 3600).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceSummary;
