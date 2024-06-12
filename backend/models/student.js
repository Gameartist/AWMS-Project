// /models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  workOptions: Array,
  assignedWorkplace: String,
  coordinates: Array,
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = {Student}
