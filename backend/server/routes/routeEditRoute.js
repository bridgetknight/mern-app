const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel')

router.put('/editRoute/:routeId', async (req, res) => {
    try {
        // Get new route information from body
        const { start, destination, stops, label, userId } = req.body;
        
        // Get route ID from request parameters
        const routeId = req.params.routeId;

        // Find and update the route using findByIdAndUpdate
        const updatedRoute = await routeModel.findByIdAndUpdate(routeId, {
            start,
            destination,
            stops,
            label,
            userId
        }, { new: true }); // Set { new: true } to return the updated document

        if (!updatedRoute) {
            // If the route with the provided ID was not found
            return res.status(404).json({ error: "Route not found" });
        }

        // Send a success response with the updated route
        res.status(200).json({ message: "Route updated successfully", updatedRoute });
    } catch (error) {
        // Handle any errors
        console.error("Error updating route:", error);
        res.status(500).json({ error: "An error occurred while updating the route" });
    }
});

module.exports = router;