// /models/Workplace.js
const mongoose = require('mongoose');

const workplaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  radius: { type: Number, required: true },
  coordinates: { type: Array, required: true }, // [latitude, longitude]
  capacity: { type: Number, required: true }, // Add capacity field
  fenceId: { type: String, required: true } // Geofence ID from TomTom
});

module.exports = mongoose.model('Workplace', workplaceSchema);
