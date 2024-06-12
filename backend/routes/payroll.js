// /routes/payroll.js
const express = require('express');
const router = express.Router();
const Payroll = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/models/Payroll.js');

// Calculate payroll
router.post('/calculate', async (req, res) => {
  const { studentId, hoursWorked, rate } = req.body;
  const hours = hoursWorked > 10 ? 10 : hoursWorked;
  const payroll = new Payroll({ studentId, hoursWorked: hours, rate });
  await payroll.save();
  res.send(payroll);
});

module.exports = router;
