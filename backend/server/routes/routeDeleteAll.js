const express = require("express");
const router = express.Router();
const routeModel = require('../models/routeModel');

router.post('/deleteAll/:userId', async (req, res) => {
    try {
        const deletedCount = await routeModel.deleteMany({ userId: req.params.userId });
        res.json({ message: `Successfully deleted ${deletedCount.deletedCount} routes` });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting routes' });
      }
});

module.exports = router;