// /frontend/src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const studentName = "Student Name"; // Replace with actual student name from context or state
  const assignedWorkplace = "Assigned Workplace"; // Replace with actual assigned workplace

  return (
  
   
    <div className="bg-white w-screen h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl text-center font-bold text-blue-800 mb-6">
        Welcome Joseph-Osawe Daniel, You have been assigned to CST(COM LAB)
      </h2>
      <div className="bg-gray-200 w-3/4 max-w-4xl p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-around items-center gap-6">
        <Link to="/register-attendance" className="w-full md:w-1/3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full text-lg">
            Track Attendance
          </button>
        </Link>
        <Link to="/register-attendance" className="w-full md:w-1/3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full text-lg">
            View Attendance Summary
          </button>
        </Link>
        <Link to="/payroll-report" className="w-full md:w-1/3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full w-full text-lg">
            Payroll Report
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
