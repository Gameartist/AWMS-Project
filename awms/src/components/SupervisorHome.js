// /frontend/src/components/SupervisorHome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const SupervisorHome = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState('');
  const [attendanceSummary, setAttendanceSummary] = useState([]);

  useEffect(() => {
    const fetchWorkplaces = async () => {
      try {
        const response = await axios.get('http://localhost:3001/supervisors/workplaces');
        setWorkplaces(response.data.workplaces);
      } catch (error) {
        console.error('Error fetching workplaces:', error);
      }
    };

    fetchWorkplaces();
  }, []);

  const handleWorkplaceSelect = async (workplaceName) => {
    setSelectedWorkplace(workplaceName);
    try {
      const response = await axios.post('http://localhost:3001/supervisors/workplace/attendance', { workplaceName });
      setAttendanceSummary(response.data.attendanceSummary);
    } catch (error) {
      console.error('Error fetching attendance summary:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Supervisor Dashboard</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h3 className="text-2xl font-bold mb-4">Workplaces</h3>
        <ul className="list-disc list-inside">
          {workplaces.map((workplace, index) => (
            <li key={index} className="mb-2 cursor-pointer text-blue-600" onClick={() => handleWorkplaceSelect(workplace.name)}>
              {workplace.name}
            </li>
          ))}
        </ul>
        {selectedWorkplace && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Attendance Summary for {selectedWorkplace}</h3>
            <ul className="list-disc list-inside">
              {attendanceSummary.map((summary, index) => (
                <li key={index} className="mb-2">
                  <strong>{summary.name}</strong> (ID: {summary.studentId}) - {summary.totalAttendanceTime.toFixed(2)} hours
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorHome;
