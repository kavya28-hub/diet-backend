require("dotenv").config();
const UserProfile = require("../models/UserProfile");

// BMI Calculator
function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

function img(url, text) {
  return `
    <div style="text-align:center;margin:10px;">
      <img src="${url}" style="width:180px;height:120px;border-radius:10px;object-fit:cover;">
      <p>${text}</p>
    </div>
  `;
}

// VEG OPTIONS ---------------------------------------------------
const vegBreakfast = [
  { item: "Oats with fruits", cal: 320, img: "https://images.unsplash.com/photo-1604908177307-818da3a68f7c" },
  { item: "Idli + Sambar", cal: 280, img: "https://images.unsplash.com/photo-1663045877870" },
  { item: "Poha", cal: 250, img: "https://images.unsplash.com/photo-1622445271172" }
];

const vegLunch = [
  { item: "Paneer curry + rice", cal: 520, img: "https://images.unsplash.com/photo-1603079841759" },
  { item: "Veg biryani", cal: 550, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Rajma rice", cal: 560, img: "https://images.unsplash.com/photo-1505252585461" }
];

const vegDinner = [
  { item: "Paneer tikka salad", cal: 380, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Vegetable soup + toast", cal: 250, img: "https://images.unsplash.com/photo-1608137077095" },
  { item: "Moong dal soup", cal: 230, img: "https://images.unsplash.com/photo-1546069901" }
];

// NON-VEG OPTIONS ---------------------------------------------------
const nonVegBreakfast = [
  { item: "Egg omelette", cal: 250, img: "https://images.unsplash.com/photo-1584270354949" },
  { item: "Chicken sandwich", cal: 350, img: "https://images.unsplash.com/photo-1603052875799" },
  { item: "Scrambled eggs", cal: 320, img: "https://images.unsplash.com/photo-1604908177307" }
];

const nonVegLunch = [
  { item: "Chicken curry + rice", cal: 600, img: "https://images.unsplash.com/photo-1603079841759" },
  { item: "Fish curry + rice", cal: 580, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Chicken biryani", cal: 720, img: "https://images.unsplash.com/photo-1603079841759" }
];

const nonVegDinner = [
  { item: "Chicken soup", cal: 180, img: "https://images.unsplash.com/photo-1608137077095" },
  { item: "Grilled chicken salad", cal: 350, img: "https://images.unsplash.com/photo-1543353071" },
  { item: "Egg curry + chapati", cal: 500, img: "https://images.unsplash.com/photo-1504674900247" }
];

// pick one random item
function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// MAIN HANDLER ----------------------------------------------------
async function recommendHandler(req, res) {
  try {
    const { heightCm, weightKg, age, goal, foodPreference } = req.body;

    const bmi = calculateBMI(heightCm, weightKg);

    const isVeg = foodPreference === "veg";

    const breakfast = pickOne(isVeg ? vegBreakfast : nonVegBreakfast);
    const lunch = pickOne(isVeg ? vegLunch : nonVegLunch);
    const dinner = pickOne(isVeg ? vegDinner : nonVegDinner);

    const mealsHtml = `
      <h4 class="text-success">Your BMI: ${bmi}</h4>

      <h3 class="text-success mt-3">Breakfast</h3>
      ${img(breakfast.img, `${breakfast.item} - ${breakfast.cal} Cal`)}

      <h3 class="text-success mt-3">Lunch</h3>
      ${img(lunch.img, `${lunch.item} - ${lunch.cal} Cal`)}

      <h3 class="text-success mt-3">Dinner</h3>
      ${img(dinner.img, `${dinner.item} - ${dinner.cal} Cal`)}

      <h3 class="text-success mt-3">Hydration</h3>
      <p>Drink <strong>${(weightKg * 0.04).toFixed(1)} L</strong> water per day.</p>

      <h3 class="text-success mt-3">Workout Tip</h3>
      <p>20–30 mins brisk walk, light stretching or yoga.</p>
    `;

    res.json({
      success: true,
      recommendation: {
        summary: `Your BMI is ${bmi}`,
        mealsHtml,
        aiSummary: ""
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { recommendHandler };




