// backend/routes/api.js
const express = require("express");
const router = express.Router();

const { recommendHandler } = require("../controllers/recommendController");

// Test route
router.get("/", (req, res) => {
  res.json({ message: "API working!" });
});

// Main route used by your frontend
router.post("/recommend", recommendHandler);

module.exports = router;
