const mongoose = require('mongoose');

const workplaceSchema = new mongoose.Schema({
  name: String,
  coordinates: [Number],
  capacity: Number,
});

module.exports = mongoose.model('Workplace', workplaceSchema);
