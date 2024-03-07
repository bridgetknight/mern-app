const express = require("express");
const router = express.Router();
const locationModel = require('../models/locationModel')

router.post('/saveLocation', async (req, res) => {
    try {
      // Create a new location document
      const location = new locationModel({
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        userId: req.body.userId,
        label: req.body.label
      });
  
      // Save the location to the database
      await location.save();
  
      // Send a success response
      res.status(201).json({ message: 'Location saved successfully', location });
    } catch (error) {
      // Handle errors
      console.error('Error saving location:', error);
      res.status(500).json({ error: 'An error occurred while saving the location' });
    }
  });

module.exports = router;