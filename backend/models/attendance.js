// /models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  totalAttendanceTime: { type: Number, default: 0 }, // Time in seconds
  attendanceLogged: { type: Boolean, default: false }, // Indicates if attendance has been logged for the day
  lastLoggedDate: { type: Date, default: null } // Date of the last logged attendance
});

module.exports = mongoose.model('Attendance', attendanceSchema);
