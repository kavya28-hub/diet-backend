const AuthUser = require("../models/AuthUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ------------------- SIGNUP -------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await AuthUser.findOne({ email });
    if (exists) return res.json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new AuthUser({ name, email, password: hashed });
    await user.save();

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------- LOGIN -------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

