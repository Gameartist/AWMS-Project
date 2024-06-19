// /models/Student.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  workOptions: {type: Array, required: true},
  assignedWorkplace: { type: String, required: true },
  coordinates: Array,
  password: {type: String, required: true},
  fenceId: { type: String, required: true }, // Geofence ID from TomTom API
  
}, { timestamps: true });
// Hash password before saving the student document
studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
  
});

// Method to compare entered password with hashed password in the database
studentSchema.methods.matchPassword= async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Student = mongoose.model('Student', studentSchema);
module.exports = {Student}
