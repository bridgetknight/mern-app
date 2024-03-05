const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");

const routeModel = require("../models/routeModel");

router.get("/route/:routeId", async (req, res) => {
    try {
        const route = await routeModel.find({ routeId: req.params.routeId });
        return res.json(route);
    } catch(error) {
        console.error(error);
        res.status(400).json({error : "Route ID not found"});
    }
});

module.exports = router;
