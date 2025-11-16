require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");  // ⭐ ADD THIS LINE ⭐

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/diet_reco_db";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err.message));

// API routes for diet system
app.use("/api", apiRoutes);

// ⭐ ADD THIS ROUTE FOR LOGIN/SIGNUP ⭐
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => res.send({ ok: true, now: new Date() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


