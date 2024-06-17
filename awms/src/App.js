// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Adminreg from './components/adminreg';
import AttendanceLogger from './components/AttendanceLogger';

import Home from './components/home';
import PayrollCalculator from './components/PayrollCalculator';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Adminreg/>}/>
          <Route path= '/RegisterAttendance' element = {<AttendanceLogger/>}/>
          <Route path= '/PayrollGenerator' element = {<PayrollCalculator/>}/>
        </Routes>
      </Router>  
    </div>
    
  )
};



export default App;
