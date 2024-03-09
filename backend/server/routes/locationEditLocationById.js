const express = require("express");
const router = express.Router();
const z = require('zod')
const locationModel = require('../models/locationModel')
const  { locationValidation }  = require('../models/locationValidator');

router.put('/editLocationById/:locId', async (req, res) =>
{
    try{
        const locId = req.params.locId;

        const validationResult = locationValidation(req.body);
        if (!validationResult.success){
            return res.status(400).json({message: validationResult.error.errors});
        }

        const location = await locationModel.findById(locId);
    if (!location){
        return res.status(400).json({message: "Location not found"});
    }

    location.streetAddress = req.body.streetAddress;
    location.city = req.body.city;
    location.state = req.body.state;
    location.postalCode = req.body.postalCode;

    const updatedLocation = await location.save();

    res.status(200).json({message: "Location updated successfully", location: updatedLocation});

    }

    catch (error) {
        console.error("Error updating location", error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;


