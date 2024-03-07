const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel');

router.post('/deleteAllRoutes/:userId', async (req, res) => {
    try {
        // Check if any routes exist for the specified userId
        const routesExist = await routeModel.exists({ userId: req.params.userId });

        if (!routesExist) {
            // If no routes exist for the userId, return a 404 Not Found response
            return res.status(404).json({ error: "No routes found for the specified user" });
        }

        // Delete all routes associated with the userId
        const deletedCount = await routeModel.deleteMany({ userId: req.params.userId });
        
        // Send a success response
        res.json({ message: `Successfully deleted ${deletedCount.deletedCount} routes` });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: "Error deleting routes" });
    }
});

module.exports = router;