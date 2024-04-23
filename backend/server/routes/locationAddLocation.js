const express = require("express");
const router = express.Router();
const locationModel = require('../models/locationModel')

router.post('/addLocation', async (req, res) => {
  try {
      // Check if the location already exists for the user
      const existingLocation = await locationModel.findOne({
          streetAddress: req.body.streetAddress,
          zipCode: req.body.zipCode,
          username: req.body.username
      });

      if (existingLocation) {
          return res.status(400).json({ error: 'Location Already Exists' });
      }

      // Create a new location document
      const location = new locationModel({
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          username: req.body.username,
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