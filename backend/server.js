const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "https://role-based-admin-panel-delta.vercel.app",
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Auth routes
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/users", userRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
