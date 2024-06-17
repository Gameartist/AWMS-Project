// /models/Payroll.js
const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
 // /models/Payroll.js

  studentId: { type: String, required: true },
  hoursWorked: { type: Number, required: true },
  rate: { type: Number, required: true },
  totalPayment: { type: Number, required: true },
  reportDate: { type: Date, required: true }
});



module.exports = mongoose.model('Payroll', payrollSchema);
