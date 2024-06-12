// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Adminreg from './components/adminreg';
import AttendanceLogger from './components/AttendanceLogger';

import Home from './components/home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Adminreg/>}/>
          <Route path= '/RegisterAttendance' element = {<AttendanceLogger/>}/>
        </Routes>
      </Router>
    </div>
    
  )
};



export default App;
