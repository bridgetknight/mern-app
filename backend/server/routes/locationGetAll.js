const express = require("express");
const router = express.Router();
const locationModel = require('../models/locationModel')


router.get('/getAll/:userId', async (req, res) => {

 try {
   const locations = await locationModel.find({ userId: req.params.userId });
  
   if (!locations) {
       return res.status(404).json({ locationnotfound: "Invalid User" });
   }


   return res.json(locations);


}
catch (err)
{
   console.error(err);
   return res.status(500).json({ error: "Internal Server Error" });
}
});

module.exports = router;

