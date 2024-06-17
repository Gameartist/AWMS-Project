// /frontend/src/components/AttendanceLogger.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AttendanceLogger.css';
const AttendanceLogger = () => 
{
  
  // const [coordinates, setCoordinates] = useState([0, 0]);
  // const [signInTime, setSignInTime] = useState(new Date());
  // const [signOutTime, setSignOutTime] = useState(new Date());
  const [studentId, setStudentId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [watchId, setWatchId] = useState(null);
  const [status, setStatus] = useState('');
  const [attendanceLogged, setAttendanceLogged] = useState(false);
  const [coordinates, setCoordinates] = useState([]);


// Clean up watchId when the component is unmounted
useEffect(() => {
  return () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };
}, [watchId]);

const startTracking = async () => {
  try {
    // Check if attendance is already logged for the day
    const response = await axios.post('http://localhost:3001/students/check-attendance', { studentId });
    console.log(coordinates, "DFGHJJ")
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

    console.log(id, "EDFVGHJK", coordinates)
    setWatchId(id);
  } catch (error) {
    console.error('Error starting tracking:', error);
    setStatus('Error starting tracking');
  }
};

const stopTracking = async () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
  if (!window.confirm('You are about to stop tracking your attendance for today. Are you sure?')) {
    return;
  }

  setIsTracking(false);
  const endTime = new Date();
  const timeSpent = (endTime - startTime) / 1000; // Time in seconds
  setTotalTime(totalTime + timeSpent);

  try {
    // Log attendance
    await axios.post('http://localhost:3001/attendance/log', {
      studentId,
      coordinates: coordinates,
      totalAttendanceTime: totalTime + timeSpent
    });

    setAttendanceLogged(true);
    setStatus('Tracking stopped and attendance logged');
  } catch (error) {
    console.error('Error logging attendance:', error);
    setStatus('Error logging attendance');
  }
};

const handlePosition = async (position) => {
  setCoordinates([...coordinates, position.coords.latitude, position.coords.longitude])
};

const handleError = (error) => {
  console.error('Geolocation error:', error);
  setStatus('Geolocation error');
};

useEffect(() => {
  if(coordinates.length !== 0){
    console.log("COORD", coordinates)
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    try {
      axios.post('http://localhost:3001/students/check-geofence', {
        studentId,
        latitude,
        longitude
      })
      .then((response) => {
        console.log(response.data)

        const { insideGeofence } = response.data;
  
        if (!insideGeofence) {
          setStatus('Outside geofence area');
          stopTracking();
          alert('You just left the geofenced area designated for your workplace.');
        } else {
          setStatus('Inside geofence area');
        }
      })
    } catch (error) {
      console.error('Error checking geofence:', error);
      setStatus('Error checking geofence');
    }
  }
}, [coordinates])

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
  <div>
    <h2>Attendance Tracker</h2>
    <input
      type="text"
      placeholder="Student ID"
      value={studentId}
      onChange={(e) => setStudentId(e.target.value)}
      disabled={isTracking || attendanceLogged}
    />
    <p>Status: {status}</p>
    <p>Total Time: {totalTime.toFixed(2)} seconds</p>
    <button onClick={startTracking} disabled={isTracking || !studentId || attendanceLogged}>Start Tracking</button>
    <button onClick={stopTracking} disabled={!isTracking}>Stop Tracking</button>
  </div>
);





};

export default AttendanceLogger;