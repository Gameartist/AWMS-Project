import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AttendanceLogger = () => {
  const [studentId, setStudentId] = useState(sessionStorage.getItem('studentid'));
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [watchId, setWatchId] = useState(null);
  const [status, setStatus] = useState('');
  const [attendanceLogged, setAttendanceLogged] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [showAttendanceSummary, setShowAttendanceSummary] = useState(false);

  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const startTracking = async () => {
    try {
      const response = await axios.post('http://localhost:3001/students/check-attendance', { studentId });
      if (response.data.attendanceLogged) {
        alert('You have already logged your attendance for the day.');
        return;
      }

      setIsTracking(true);
      setStartTime(new Date());
      setStatus('Tracking started');

      const id = navigator.geolocation.watchPosition(
        handlePosition,
        handleError,
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      setWatchId(id);
    } catch (error) {
      console.error('Error starting tracking:', error);
      setStatus('Error starting tracking');
    }
  };

  const stopTracking = async () => {
    setIsTracking(false);
    const endTime = new Date();
    const timeSpent = (endTime - startTime) / 1000; // Time in seconds
    setTotalTime(totalTime + timeSpent);
    
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
    if (!window.confirm('You are about to stop tracking your attendance for today. Are you sure?')) {
      return;
    }

    try {
      await axios.post('http://localhost:3001/attendance/log', {
        studentId,
        coordinates: coordinates,
        totalAttendanceTime: totalTime + timeSpent
      });

      setAttendanceLogged(true);
      setStatus('Tracking stopped and attendance logged');
      setShowAttendanceSummary(true); // Show summary after logging attendance
    } catch (error) {
      console.error('Error logging attendance:', error);
      setStatus('Error logging attendance');
    }
  };

  const handlePosition = (position) => {
    setCoordinates([...coordinates, position.coords.latitude, position.coords.longitude]);
  };

  const handleError = (error) => {
    console.error('Geolocation error:', error);
    setStatus('Geolocation error');
  };

  useEffect(() => {
    if (coordinates.length !== 0) {
      const latitude = coordinates[0];
      const longitude = coordinates[1];
      try {
        axios.post('http://localhost:3001/students/check-geofence', {
          studentId,
          latitude,
          longitude
        })
        .then((response) => {
          const { insideGeofence, insideGeofenceM } = response.data;

          if (!insideGeofence && !insideGeofenceM) {
            setStatus('Outside geofence area');
            stopTracking();       
            alert('You just left the geofenced area designated for your workplace.');
          } else {
            setStatus('Inside geofence area');
          }
        });
      } catch (error) {
        console.error('Error checking geofence:', error);
        setStatus('Error checking geofence');
      }
    }
  }, [coordinates]);

  useEffect(() => {
    const handleOnline = () => {
      setStatus('Back online, tracking resumed.');
      if (isTracking) {
        startTracking();
      }
    };

    const handleOffline = () => {
      setStatus('You are offline, tracking paused.');
      if (isTracking) {
        stopTracking();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isTracking]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Attendance Tracker</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        readOnly
        onChange={(e) => setStudentId(e.target.value)}
        disabled={isTracking || attendanceLogged}
        className="w-full max-w-xs p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      <p className="mb-4 text-blue-600">Status: {status}</p>
      <p className="mb-4 text-blue-600">Total Time: {totalTime.toFixed(2)} seconds</p>
      <button
        onClick={startTracking}
        disabled={isTracking || !studentId || attendanceLogged}
        className="w-full max-w-xs bg-blue-600 text-white py-2 mb-4 rounded hover:bg-blue-700 focus:outline-none"
      >
        Start Tracking
      </button>
      <button
        onClick={stopTracking}
        disabled={!isTracking}
        className="w-full max-w-xs bg-red-600 text-white py-2 rounded hover:bg-red-700 focus:outline-none"
      >
        Stop Tracking
      </button>
      
      {/* Attendance Summary Display */}
      {showAttendanceSummary && (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Attendance Summary</h3>
          <p><strong>Student ID:</strong> {studentId}</p>
          <p><strong>Total Time:</strong> {totalTime.toFixed(2)} seconds</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default AttendanceLogger;
