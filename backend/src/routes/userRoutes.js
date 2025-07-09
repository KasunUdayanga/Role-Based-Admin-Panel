const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const userController = require("../controllers/userController");

// Get all users (any authenticated user can view all users, but not modify)
router.get("/users", auth, userController.getAllUsers);

// Update own profile (authenticated user)
router.put("/me", auth, userController.updateOwnProfile);

module.exports = router;
