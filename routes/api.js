// backend/routes/api.js
const express = require("express");
const router = express.Router();

const { recommendHandler } = require("../controllers/recommendController");
const auth = require("../middleware/auth");   // ⭐ ADD THIS ⭐

// Test route
router.get("/", (req, res) => {
  res.json({ message: "API working!" });
});

// Protected diet route ⭐ NOW PROTECTED ⭐
router.post("/recommend", auth, recommendHandler);

module.exports = router;
