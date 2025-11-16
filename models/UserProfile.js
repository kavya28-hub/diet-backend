const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  heightCm: Number,
  weightKg: Number,
  age: Number,
  goal: String,
  foodPreference: String,
  bmi: Number,
  recommendation: {
    summary: String,     // BMI summary
    mealsHtml: String,   // Meals with images
    aiSummary: String,   // <-- AI diet guidance
    createdAt: { type: Date, default: Date.now }
  }
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
