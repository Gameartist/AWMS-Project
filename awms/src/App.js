import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentRegistration from './components/StudentRegistration';
import Login from './components/Login';
import Home from './components/home';
import AttendanceLogger from './components/AttendanceLogger';
import PayrollCalculator from './components/PayrollCalculator';
import Adminreg from './components/adminreg';
import GeofenceDeleter from './components/GeofenceDeleter';
// import AttendanceSummary from './components/AttendanceSummary';


const App = () => {
  return (
    <div className="">
      <Router>      
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/register" element={<StudentRegistration/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/register-attendance" element={<AttendanceLogger/>} />
          <Route path="/view-attendance" element={<AttendanceLogger/>} />
          <Route path="/payroll-report" element={<PayrollCalculator/>} />
          <Route path="/admin" element={<Adminreg/>} />
          <Route path="/delete-geofence" element ={<GeofenceDeleter/>}/>
          {/* <Route path="/attendance-summary" element = {<AttendanceSummary/>}/> */}
          
        </Routes>
      </Router>
    </div>
    
  );
};

export default App;
