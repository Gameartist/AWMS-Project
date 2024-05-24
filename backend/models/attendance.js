const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  signInTime: Date,
  signOutTime: Date,
  coordinates: [Number],
});

module.exports = mongoose.model('Attendance', attendanceSchema);