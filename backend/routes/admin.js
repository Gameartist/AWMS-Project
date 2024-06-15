const express = require("express")
const Workplace = require("../models/Workplace")
const router = express.Router();
const axios = require('axios');
/*router.get('/initWorkplaces'), async (req, res) =>
     {
        const new_place = new Workplace({
            name: "",
           coordinates: [],
            capacity: "",

        });
        await new_place.save;
        res.send(new_place);
     }*/

   
        
        router.post('/register', async (req, res) => {
          const { name, radius, latitude, longitude, capacity } = req.body;
          const apiKey = '5cHkoIFrAycFcOVEXIwhKfLHCQUrsQdA';
          const adminKey = 'Dwj1PytrHlULx2IraqeyPMyAjulkOwshthL7Ka2RGBUsefgA';
          const projectId = '24e9443e-3eaa-4a0a-a0a9-45fa5c6b598f';
        
          // Validate input
          if (!name || !radius || !capacity) {
            return res.status(400).json({ error: 'Name, radius, and capacity are required.' });
          }
        
          if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Please provide latitude and longitude or use geolocation to obtain current position.' });
          }
        
          try {
            // Create the geofence via TomTom API
            console.log("BODY: ", req.body)
            const response = await axios.post(`https://api.tomtom.com/geofencing/1/projects/24e9443e-3eaa-4a0a-a0a9-45fa5c6b598f/fence?key=5cHkoIFrAycFcOVEXIwhKfLHCQUrsQdA&adminKey=Dwj1PytrHlULx2IraqeyPMyAjulkOwshthL7Ka2RGBUsefgA`, {
              name: name,
              type: 'Feature',
              geometry: {
                radius: radius,
                type: 'Point',
                shapeType: 'Circle',
                coordinates: [longitude, latitude] // [lon, lat] order for TomTom API
              }
            });
        
            const { id: fenceId } = response.data; // Use `id` as `fenceId`
            console.log("HEREEEE: ", fenceId)

            // Save geofence to the database
            
            const new_place = new Workplace({
              name: name,
              radius: radius,
              coordinates: [latitude, longitude], // [lat, lon] order for database
              capacity: capacity,
              fenceId: fenceId,
            })

            await new_place.save()
            res.status(201).json(new_place);
          } 
          catch (error) 
          {
            console.error(error)
            res.status(500).json({ error: error.message });
          }
        });
        
        module.exports = router;
        
