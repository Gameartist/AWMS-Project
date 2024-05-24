// /routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/models/student.js');

// Register student
router.post('/register', async (req, res) => {
  const { name, studentId, workOptions, IMEI } = req.body;
  const student = new Student({ name, studentId, workOptions});
  await student.save();
  res.send(student);
});

// Allocate workplaces (implement allocation logic here)
router.post('/allocate', async (req, res) => {
  // Allocation logic
  res.send('Allocation complete');
});

module.exports = router;
