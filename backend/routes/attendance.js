// /routes/attendance.js
const express = require('express');
const router = express.Router();
const Attendance = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/models/attendance.js');

// Log attendance
router.post('/log', async (req, res) => {
  const { studentId, signInTime, signOutTime, coordinates } = req.body;
  const attendance = new Attendance({ studentId, signInTime, signOutTime, coordinates });
  await attendance.save();
  res.send(attendance);
});

module.exports = router;
