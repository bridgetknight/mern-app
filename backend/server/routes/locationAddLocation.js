const express = require("express");
const router = express.Router();
const z = require('zod')
const {locationValidation } = require('../models/locationValidator')
const locationModel = require('../models/locationModel')

router.post('/addLocation', async (req, res) => {
    const { error } = locationValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ message: error.errors[0].message });

    const { streetAddress, city, state, postalCode } = req.body

    //check if location already exists
    const location = await locationModel.findOne({ streetAddress: streetAddress })
    if (location)
        return res.status(409).send({ message: "Location exists and saved" })


    //creates a new location
    const createLocation = new locationModel({
        streetAddress: streetAddress,
        city: city,
        state: state,
        postalCode : postalCode,
    });

   
    try {
        const saveNewLocation = await createLocation.save();
        res.send(saveNewLocation);
    } catch (error) {
        res.status(400).send({ message: "Error saving new location" });
    }

})

module.exports = router;