// /routes/coordinates.js
const express = require('express');
const router = express.Router();
const Workplace = require('c:/Users/Daniel/Documents/Project Stuff/AWMS Project/backend/models/Workplace.js');

// Store coordinates
router.post('/store', async (req, res) => {
  const { name, coordinates, capacity } = req.body;
  const workplace = new Workplace({ name, coordinates, capacity });
  await workplace.save();
  res.send(workplace);
});

module.exports = router;
