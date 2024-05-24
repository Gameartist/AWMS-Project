const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  workOptions: [String],
  assignedWorkplace: String,
  coordinates: [Number],
});

module.exports = mongoose.model('Student', studentSchema);