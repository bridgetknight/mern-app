const express = require("express");
const router = express.Router();
const locationModel = require('../models/locationModel'); 

router.delete('/deleteLocationById/:locId', async (req, res) => {
  try {
    // Extract location ID from request parameters
    const locId = req.params.locId;

    // Find the location by ID 
    const deleteLocation = await locationModel.findById(locId);

    // Check if location exists
    if (!deleteLocation) {
        return res.status(404).json({ message: "Location not found" });
    }

    // Delete the location
    await locationModel.deleteOne({ _id: locId });

    return res.status(200).json({ message: "Successfully Deleted Location", deleteLocation });
} 
catch (error) {
    console.error("Error deleting location:", error);
    return res.status(500).json({ message: "Internal server error" });
}

});

module.exports = router;
  
