const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new User
// @access Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
});
