const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await AuthUser.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists." });

    const hashed = await bcrypt.hash(password, 10);

    const user = new AuthUser({ name, email, password: hashed });
    await user.save();

    res.json({ success: true, message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password." });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token });

  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
