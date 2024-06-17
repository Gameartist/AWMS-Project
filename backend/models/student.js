// /models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  workOptions: {type: Array, required: true},
  assignedWorkplace: { type: String, required: true },
  coordinates: Array,
  fenceId: { type: String, required: true }, // Geofence ID from TomTom API
  
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = {Student}
