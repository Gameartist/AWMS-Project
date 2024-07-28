// /routes/supervisors.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Supervisor = require('../models/Supervisor');
const Student = require('../models/Student');
const Workplace = require('../models/Workplace');
const Attendance = require('../models/Attendance');
const router = express.Router();


// Supervisor registration route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the supervisor already exists
      let supervisor = await Supervisor.findOne({ email });
      if (supervisor) {
        return res.status(400).json({ error: 'Supervisor already exists' });
      }
  
      // Create a new supervisor
      supervisor = new Supervisor({ name, email, password });
  
      // Save the supervisor to the database
      await supervisor.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: supervisor._id }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.status(201).json({ message: 'Supervisor registered successfully', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const supervisor = await Supervisor.findOne({ email });
    if (!supervisor) {
      return res.status(404).json({ error: 'Supervisor not found' });
    }

    const isMatch = await supervisor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: supervisor._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all workplaces
router.get('/workplaces', async (req, res) => {
  try {
    const workplaces = await Workplace.find();
    res.json({ workplaces });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch students and their attendance for a workplace
router.post('/workplace/attendance', async (req, res) => {
  const { workplaceName } = req.body;

  try {
    const students = await Student.find({ assignedWorkplace: workplaceName });
    const attendanceSummary = await Promise.all(students.map(async (student) => {
      const attendance = await Attendance.findOne({ studentId: student.studentId });
      return {
        name: student.name,
        studentId: student.studentId,
        totalAttendanceTime: attendance ? attendance.totalAttendanceTime / 3600 : 0 // converting seconds to hours
      };
    }));

    res.json({ attendanceSummary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
