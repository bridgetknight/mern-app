const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel')

router.get('/:userId', async (req, res) => {
    try {
        const route = await routeModel.find({ userId: req.params.userId });
        return res.json(route);
    } catch(error) {
        console.error(error);
        res.status(500).json({error : "Error fetching routes"});
    }
});

module.exports = router;