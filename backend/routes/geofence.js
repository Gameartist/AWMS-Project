// /backend/routes/geofence.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Workplace = require("../models/Workplace");

const apiKey = '5cHkoIFrAycFcOVEXIwhKfLHCQUrsQdA';
const adminKey = 'Dwj1PytrHlULx2IraqeyPMyAjulkOwshthL7Ka2RGBUsefgA';

// Delete geofence route
router.delete('/delete', async (req, res) => {
    
  const { projectId, fenceId } = req.body; // Accept projectId and fenceId from the request body
  

  if (!projectId || !fenceId) {
    return res.status(400).json({ error: 'Project ID and Fence ID are required' });
  }

  try {
    
    const url = `https://api.tomtom.com/geofencing/1/projects/24e9443e-3eaa-4a0a-a0a9-45fa5c6b598f/fences/${fenceId}?key=5cHkoIFrAycFcOVEXIwhKfLHCQUrsQdA&adminKey=Dwj1PytrHlULx2IraqeyPMyAjulkOwshthL7Ka2RGBUsefgA&dryRun=false`;
    const response = await axios.delete(url);
    
    res.status(200).json({ message: 'Geofence deleted successfully', data: response.data });
  } catch (error) {
    console.error('Error deleting geofence:', error);
    res.status(500).json({ error: 'Failed to delete geofence. Please try again.' });
  }
});

module.exports = router;
