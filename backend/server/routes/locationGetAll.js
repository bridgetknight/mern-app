const express = require("express");
const router = express.Router();
const newLocationModel = require('../models/locationModel')

router.get('/getAll', async (req, res) => {
    const savedLocations = await newLocationModel.find();
    return res.json(savedLocations)
  })

  module.exports = router;