const express = require("express");
const router = express.Router();
const newUserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Get all users
router.get("/getAll", async (req, res) => {
  try {
    const users = await newUserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error });
  }
});

// Get user by ID
router.get("/getUserById", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await newUserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User ID does not exist.");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user.");
  }
});

// Generate JWT token
router.post("/token", (req, res) => {
  const { userId, email, username, password, firstName, lastName } = req.body;
  const token = jwt.sign(
    { id: userId, email, username, password, firstName, lastName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );
  res.json({ accessToken: token });
});

module.exports = router;
