const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/users
// @desc Add a new user (Admin Only)
// @access Private

router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ message: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @routes PUT /api/admin/users
// @desc Update user details
// @access Private/admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, password, role } = req.body;

    user.name = name || user.name;
    user.email = email || user.password;
    user.password = password || user.password;
    user.role = role || user.role;

    // Save updated User to database
    const updatedUser = await user.save();
    res.json({ message: "User updated Successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route /api/admin/users
// @desc Delete User
// @access Private/Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ messsage: "Server Error" });
  }
});

module.exports = router;
