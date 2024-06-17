// /routes/payroll.js
const express = require('express');
const router = express.Router();
const { Student } = require('../models/Student');
const Attendance = require('../models/Attendance');

// Calculate payroll
router.post('/calculate', async (req, res) => {
  const { studentId } = req.body;
  const rate = 500; // Fixed rate per hour
  const maxHours = 10; // Maximum payable hours per week

  try {
    // Check if student exists
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Retrieve attendance data
    const attendance = await Attendance.findOne({ studentId });
    if (!attendance) return res.status(404).json({ error: 'Attendance not found' });

    // Convert total attendance time from seconds to hours
    const totalHoursWorked = attendance.totalAttendanceTime / 3600;

    // Apply the 10-hour limit
    const payableHours = Math.min(totalHoursWorked, maxHours);

    // Calculate total payment
    const totalPayment = payableHours * rate;

    // Create a payroll report (if you have a Payroll schema)
    /*
    const payroll = new Payroll({
      studentId,
      hoursWorked: payableHours,
      rate,
      totalPayment,
      reportDate: new Date()
    });
    await payroll.save();
    */

    res.json({
      studentId,
      hoursWorked: payableHours,
      rate,
      totalPayment,
      reportDate: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
