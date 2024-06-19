// /backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { Student } = require('../models/Student'); // Import the Student model

// Login route
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body; // Destructure studentId and password from request body

  try {
    // Find student by studentId
    const student = await Student.findOne({ studentId });
    if (!student) {
      // Student not found
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      // Password does not match
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    

    // Send success response with student details
    res.json({
      message: 'success',
      student: {
        name: student.name,
        studentId: student.studentId,
        assignedWorkplace: student.assignedWorkplace
      }
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
