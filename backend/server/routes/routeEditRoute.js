const express = require("express");
const router = express.Router();
const z = require('zod');
const routeModel = require('../models/routeModel')

router.post('/editRoute/:routeId', async (req, res) =>
{
    // store new route information
    const {start, destination, stops, label, userId} = req.body

    // get route to edit
    const routeId = req.params.routeId;

    // find and route using stored information
    routeModel.findByIdAndUpdate(routeId, {
        start : start,
        start : start,
        destination : destination,
        stops : stops
    }, function (err, route) {
    if (err){
        console.log(err);
    }});

})

module.exports = router;