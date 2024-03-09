const express = require("express");
const router = express.Router();
const locationModel = require("../models/locationModel");

router.get("/getLocationById/:locId", async (req, res) => {

  locationModel.findById(req.params.locId)
  .then ((locationModel) => res.json (locationModel))
  .catch((err) => 
  res.status(404).json ({locationnotfound: "Location not found"}));

});

module.exports = router;


