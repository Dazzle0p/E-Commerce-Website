const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// @route GET /api/orders/my-orders/
// @desc Get logged-in user's orders
// @access Private

router.get("/my-orders", protect, async (req, res) => {
  try {
    // Find orders for the authenticated users
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // Sort order's by most recent orders
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/orders/:id
// @desc Get Order details by ID
// @access Private

router.get("/:id", protect, async (req, res) => {
  try {
    // const { id } = req.params;

    // // Validate MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid order ID format" });
    // }

    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the full order details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
