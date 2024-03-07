const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel')

router.get('/getAllRoutes/:userId', async (req, res) => {
    try {
        const route = await routeModel.find({ userId: req.params.userId });
        if (Object.keys(route).length === 0) {
            // route is an empty object or empty JSON
            console.log("This user has no routes");
        }
        return res.json(route);
    } catch(error) {
        console.error(error);
        res.status(500).json({error : "Error fetching routes"});
    }
});

module.exports = router;