const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel');

router.delete('/deleteRouteById/:routeId', async (req, res) => {
    try {
        // Check if the route exists with the provided routeId
        const route = await routeModel.findOne({ routeId: req.params.routeId });

        if (!route) {
            // If no route exists with the provided routeId, return a 404 Not Found response
            return res.status(404).json({ error: "Route not found" });
        }

        // Delete the route associated with the provided routeId
        await routeModel.deleteOne({ routeId: req.params.routeId });
        
        // Send a success response
        res.json({ message: "Route deleted successfully" });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: "Error deleting route" });
    }
});

module.exports = router;