import React from "react";
import { Link } from "react-router-dom";
import StudentRegistration from "./StudentRegistration";
import AttendanceLogger from "./AttendanceLogger";
const Home = () => {
   return(
    <div>

      <StudentRegistration/>
   
      <Link to ="/admin">Link to admin page</Link>
      <Link to = "/RegisterAttendance">Track your attendance</Link>
    </div>
   )
}


export default Home;