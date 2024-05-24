const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  studentId: String,
  hoursWorked: Number,
  rate: Number,
});

module.exports = mongoose.model('Payroll', payrollSchema);
