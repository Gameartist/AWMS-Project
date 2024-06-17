import React from "react";
import { Link } from "react-router-dom";
import StudentRegistration from "./StudentRegistration";
const Home = () => {
   return(
    <div>

      <StudentRegistration/>
   
      <Link to ="/admin">Link to admin page</Link>
      <Link to = "/RegisterAttendance">Track your attendance</Link>
      <Link to = "/PayrollGenerator">Generate Payroll report</Link>
    </div>
   )
}


export default Home;