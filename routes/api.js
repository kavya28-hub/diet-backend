const express = require("express");
const router = express.Router();

const { recommendHandler } = require("../controllers/recommendController");

// Test route
router.get("/", (req, res) => {
  res.json({ message: "API working!" });
});

// Diet recommendation route
router.post("/recommend", recommendHandler);

module.exports = router;

