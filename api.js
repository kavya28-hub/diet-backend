// backend/routes/api.js
const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

// AI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Dummy test route
router.get("/", (req, res) => {
  res.json({ message: "API working!" });
});

// AI route
router.post("/ask-ai", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // IMPORTANT
