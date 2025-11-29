const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  heightCm: Number,
  weightKg: Number,
  age: Number,
  goal: String,
  foodPreference: String,
  bmi: Number,
  recommendation: {
    summary: String,
    mealsHtml: String,
    aiSummary: String
  }
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
