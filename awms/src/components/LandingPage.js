import React from "react";
import { Link } from "react-router-dom";
import './styles.css';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-blue-800 text-center mb-10">
        Welcome to The Automated Work-Study System
      </h1>
      <div className="flex space-x-4">
        <Link to="/register">
          <button className="bg-blue-600 text-white text-2xl font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-white text-blue-600 border-2 border-blue-600 text-2xl font-semibold py-3 px-8 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;