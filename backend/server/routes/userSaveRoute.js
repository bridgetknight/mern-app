const express = require("express");
const router = express.Router();
const routeModel = require("../models/routeModel");

router.post("/saveRoute", async (req, res) => {
  try {
    const route = new routeModel({
      userId: req.body.userId,
      start: req.body.start,
      destination: req.body.destination,
      locations: req.body.locations,
    });

    await route.save();

    res.status(201).json({ message: "Route saved successfully", route });
  } catch (error) {
    console.error("Error saving route:", error);
    res.status(500).json({ error: "An error occurred while saving the route" });
  }
});

module.exports = router;
