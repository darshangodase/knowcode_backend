const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const eWasteRoutes = require("./routes/eWasteRoutes");
const amaRoutes = require("./routes/amaRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();
app.use(express.json());
app.use(cors());

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/ewaste", eWasteRoutes);
app.use("/api/ama", amaRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/dashboard", dashboardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});