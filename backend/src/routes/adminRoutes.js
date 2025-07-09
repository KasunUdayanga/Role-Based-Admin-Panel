const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { auth, admin } = require("../middleware/auth");

// Get all users (admin only)
router.get("/users", auth, admin, adminController.getAllUsers);

// Delete a user by ID (admin only)
router.delete("/users/:id", auth, admin, adminController.deleteUser);

// Change user role (admin only)
router.put("/users/:id/role", auth, admin, adminController.changeUserRole);

module.exports = router;