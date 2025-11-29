require("dotenv").config();
const UserProfile = require("../models/UserProfile");

// BMI Calculator
function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

// ---------------- STATIC MEAL RECOMMENDATIONS ----------------

// 10 Veg recommendations
const vegMeals = [
  "Vegetable Upma + Green Tea",
  "Moong Dal Khichdi + Salad",
  "Chapati + Mixed Veg Curry",
  "Sprouts Chaat + Lemon Water",
  "Oats with Fruits",
  "Veg Biryani + Raita",
  "Dosa + Sambar",
  "Paneer Curry + Brown Rice",
  "Veg Sandwich + Juice",
  "Curd Rice + Pickle"
];

// 10 Non-veg recommendations
const nonVegMeals = [
  "Egg Omelette + Brown Bread",
  "Chicken Curry + Rice",
  "Grilled Fish + Veggies",
  "Egg Fried Rice",
  "Chicken Salad",
  "Fish Curry + Chapati",
  "Boiled Eggs + Fruit Bowl",
  "Chicken Biryani (Lite) + Raita",
  "Grilled Chicken Sandwich",
  "Prawns Curry + Rice"
];

// ------------- MAIN FUNCTION ----------------
async function recommendHandler(req, res) {
  try {
    const { heightCm, weightKg, age, goal, foodPreference } = req.body;

    if (!heightCm || !weightKg || !age || !goal || !foodPreference) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const bmi = calculateBMI(heightCm, weightKg);

    let list = [];

    if (foodPreference.toLowerCase() === "veg") {
      list = vegMeals;
    } else {
      list = nonVegMeals;
    }

    // Build HTML list
    const mealsHtml = `
      <h3>Recommended Meals (${foodPreference})</h3>
      <ul>
        ${list.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

    // Save to DB
    const profile = new UserProfile({
      heightCm,
      weightKg,
      age,
      goal,
      foodPreference,
      bmi,
      recommendation: {
        summary: `Your BMI is ${bmi}`,
        mealsHtml,
        aiSummary: "Static plan (No AI)"
      }
    });

    await profile.save();

    // Send to frontend
    res.json({
      success: true,
      recommendation: {
        summary: `Your BMI is ${bmi}`,
        mealsHtml,
        aiSummary: ""
      }
    });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { recommendHandler };




