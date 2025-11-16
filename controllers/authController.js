const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await AuthUser.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new AuthUser({
      name,
      email,
      password: hashed
    });

    await user.save();

    return res.json({ success: true, message: "Signup successful" });
  } 
  catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, error: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return res.json({ success: true, token });
  }
  catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
