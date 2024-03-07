const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel')

router.get('/getAllRoutes/:userId', async (req, res) => {
    try {

        // Check if the user ID exists in the user table
        const user = await userModel.findById(req.params.userId);
        if (!user) {
            // User does not exist
            return res.status(404).json({ error: 'User not found' });
        }

        // User exists, proceed to fetch routes
        const routes = await routeModel.find({ userId: req.params.userId });
        
        if (routes.length === 0) {
            // No routes found for the user
            return res.status(404).json({ message: "This user has no routes" });
        }

        // Routes found, return them
        return res.json(routes);
    } catch(error) {
        console.error(error);
        res.status(404).json({ error: "No routes found" });
    }
});

module.exports = router;