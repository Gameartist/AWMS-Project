// /models/Workplace.js
const mongoose = require('mongoose');

const workplaceSchema = new mongoose.Schema({
  name: String,
  coordinates: Array,
  capacity: Number,
});

module.exports = mongoose.model('Workplace', workplaceSchema);
