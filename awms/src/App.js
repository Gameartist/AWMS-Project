// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentRegistration from './components/StudentRegistration';
import AttendanceLogger from './components/AttendanceLogger';
import PayrollCalculator from './components/payrollcalculator';
import CoordinatesManager from './components/CoordinatesManager.js';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/register">Register Student</Link></li>
            <li><Link to="/log-attendance">Log Attendance</Link></li>
            <li><Link to="/calculate-payroll">Calculate Payroll</Link></li>
            <li><Link to="/manage-coordinates">Manage Coordinates</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" component={StudentRegistration} />
          <Route path="/log-attendance" component={AttendanceLogger} />
          <Route path="/calculate-payroll" component={PayrollCalculator} />
          <Route path="/manage-coordinates" component={CoordinatesManager} />
          <Route path="/" exact component={() => <h1>Welcome to the Work-Study Management System</h1>} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;
