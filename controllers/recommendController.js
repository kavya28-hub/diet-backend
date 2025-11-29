require("dotenv").config();
const UserProfile = require("../models/UserProfile");

// BMI Calculator
function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

function img(url, text) {
  return `
    <div class="meal-card">
      <img src="${url}" class="meal-img">
      <p>${text}</p>
    </div>
  `;
}

// ---------------------------------------------
// VEG BREAKFAST OPTIONS (10)
// ---------------------------------------------
const vegBreakfast = [
  { item: "Oats with fruits", cal: 320, img: "https://images.unsplash.com/photo-1604908177307-818da3a68f7c" },
  { item: "Idli + sambar", cal: 280, img: "https://images.unsplash.com/photo-1663045877870" },
  { item: "Poha", cal: 250, img: "https://images.unsplash.com/photo-1622445271172" },
  { item: "Banana smoothie", cal: 300, img: "https://images.unsplash.com/photo-1577801592838" },
  { item: "Moong dal chilla", cal: 260, img: "https://images.unsplash.com/photo-1584270354949" },
  { item: "Upma", cal: 270, img: "https://images.unsplash.com/photo-1598514983171" },
  { item: "Paneer sandwich", cal: 330, img: "https://images.unsplash.com/photo-1603052875799" },
  { item: "Sprouts bowl", cal: 200, img: "https://images.unsplash.com/photo-1555939594" },
  { item: "Fruit bowl", cal: 180, img: "https://images.unsplash.com/photo-1543353071" },
  { item: "Rava dosa", cal: 310, img: "https://images.unsplash.com/photo-1589301760014" }
];

// ---------------------------------------------
// VEG LUNCH OPTIONS (10)
// ---------------------------------------------
const vegLunch = [
  { item: "Rice + Dal + Sabji", cal: 480, img: "https://images.unsplash.com/photo-1512058564366" },
  { item: "Veg Pulao + Raita", cal: 520, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Rajma rice", cal: 560, img: "https://images.unsplash.com/photo-1505252585461" },
  { item: "Khichdi + curd", cal: 450, img: "https://images.unsplash.com/photo-1603898037225" },
  { item: "Chole + chapati", cal: 490, img: "https://images.unsplash.com/photo-1600431521340" },
  { item: "Veg biryani", cal: 550, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Paneer curry + rice", cal: 600, img: "https://images.unsplash.com/photo-1603079841759" },
  { item: "Curd rice", cal: 430, img: "https://images.unsplash.com/photo-1546069901" },
  { item: "Veg thali", cal: 650, img: "https://images.unsplash.com/photo-1598514984026" },
  { item: "Sambar rice", cal: 480, img: "https://images.unsplash.com/photo-1504674900247" }
];

// ---------------------------------------------
// VEG DINNER OPTIONS (10)
// ---------------------------------------------
const vegDinner = [
  { item: "Veg soup + toast", cal: 250, img: "https://images.unsplash.com/photo-1608137077095" },
  { item: "Paneer bhurji + chapati", cal: 420, img: "https://images.unsplash.com/photo-1598514983312" },
  { item: "Sprouts salad", cal: 200, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Veg fried rice", cal: 480, img: "https://images.unsplash.com/photo-1512058564366" },
  { item: "Oats khichdi", cal: 350, img: "https://images.unsplash.com/photo-1603898037225" },
  { item: "Dosa + sambar", cal: 430, img: "https://images.unsplash.com/photo-1589301760014" },
  { item: "Paneer tikka salad", cal: 380, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Brown rice + sabji", cal: 440, img: "https://images.unsplash.com/photo-1512058564366" },
  { item: "Moong dal soup", cal: 230, img: "https://images.unsplash.com/photo-1546069901" },
  { item: "Dal + rice (small)", cal: 390, img: "https://images.unsplash.com/photo-1505252585461" }
];

// ---------------------------------------------
// NON VEG OPTIONS (same structure as above)
// ---------------------------------------------
const nonVegBreakfast = [
  { item: "Egg omelette", cal: 250, img: "https://images.unsplash.com/photo-1584270354949" },
  { item: "Chicken sandwich", cal: 350, img: "https://images.unsplash.com/photo-1603052875799" },
  { item: "Egg dosa", cal: 300, img: "https://images.unsplash.com/photo-1589301760014" },
  { item: "Scrambled eggs", cal: 320, img: "https://images.unsplash.com/photo-1604908177307" },
  { item: "Egg fried rice", cal: 420, img: "https://images.unsplash.com/photo-1512058564366" },
  { item: "Chicken soup", cal: 180, img: "https://images.unsplash.com/photo-1608137077095" },
  { item: "Egg paratha", cal: 350, img: "https://images.unsplash.com/photo-1510626176961" },
  { item: "Chicken salad bowl", cal: 280, img: "https://images.unsplash.com/photo-1543353071" },
  { item: "Boiled eggs + fruits", cal: 240, img: "https://images.unsplash.com/photo-1604908177307" },
  { item: "Peanut butter toast", cal: 300, img: "https://images.unsplash.com/photo-1577801592838" }
];

const nonVegLunch = [
  { item: "Chicken curry + rice", cal: 600, img: "https://images.unsplash.com/photo-1603079841759" },
  { item: "Egg curry + chapati", cal: 520, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Fish curry + rice", cal: 580, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Chicken biryani", cal: 720, img: "https://images.unsplash.com/photo-1603079841759" },
  { item: "Grilled chicken", cal: 450, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Fish fry + salad", cal: 430, img: "https://images.unsplash.com/photo-1512058564366" },
  { item: "Chicken wrap", cal: 480, img: "https://images.unsplash.com/photo-1603052875799" },
  { item: "Egg rice", cal: 460, img: "https://images.unsplash.com/photo-1598514984026" },
  { item: "Chicken pulao", cal: 620, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Grilled fish", cal: 400, img: "https://images.unsplash.com/photo-1546069901" }
];

const nonVegDinner = [
  { item: "Chicken soup", cal: 180, img: "https://images.unsplash.com/photo-1608137077095" },
  { item: "Fish fry + vegetables", cal: 420, img: "https://images.unsplash.com/photo-1525755662778" },
  { item: "Egg curry + chapati", cal: 500, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Grilled chicken salad", cal: 350, img: "https://images.unsplash.com/photo-1543353071" },
  { item: "Chicken curry + chapati", cal: 560, img: "https://images.unsplash.com/photo-1603079841759" },
  { item: "Fish curry + rice", cal: 520, img: "https://images.unsplash.com/photo-1504674900247" },
  { item: "Boiled eggs + fruits", cal: 240, img: "https://images.unsplash.com/photo-1604908177307" },
  { item: "Chicken sandwich", cal: 300, img: "https://images.unsplash.com/photo-1603052875799" },
  { item: "Egg rice (small)", cal: 420, img: "https://images.unsplash.com/photo-1598514983312" },
  { item: "Chicken salad bowl", cal: 280, img: "https://images.unsplash.com/photo-1543353071" }
];

// -----------------------------------------------------

function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function recommendHandler(req, res) {
  try {
    const { heightCm, weightKg, age, goal, foodPreference } = req.body;

    const bmi = calculateBMI(heightCm, weightKg);

    const bfArr = foodPreference === "veg" ? vegBreakfast : nonVegBreakfast;
    const lnArr = foodPreference === "veg" ? vegLunch : nonVegLunch;
    const dnArr = foodPreference === "veg" ? vegDinner : nonVegDinner;

    const breakfastMain = pickOne(bfArr);
    const lunchMain = pickOne(lnArr);
    const dinnerMain = pickOne(dnArr);

    const breakfastOptions = bfArr.map(m => img(m.img, `${m.item} - ${m.cal} Cal`)).join("");
    const lunchOptions = lnArr.map(m => img(m.img, `${m.item} - ${m.cal} Cal`)).join("");
    const dinnerOptions = dnArr.map(m => img(m.img, `${m.item} - ${m.cal} Cal`)).join("");

    const mealsHtml = `
      <style>
        .meal-card { display:inline-block; width:150px; margin:8px; text-align:center; }
        .meal-img { width:100%; height:100px; border-radius:10px; object-fit:cover; }
      </style>

      <h4 class="text-success">Your BMI: ${bmi}</h4>

      <h3 class="text-success mt-3">Recommended Meals</h3>

      <h5 class='text-success mt-3'>Breakfast (Recommended)</h5>
      ${img(breakfastMain.img, `${breakfastMain.item} - ${breakfastMain.cal} Cal`)}

      <h6 class='text-warning mt-2'>Other Options</h6>
      ${breakfastOptions}

      <h5 class='text-success mt-4'>Lunch (Recommended)</h5>
      ${img(lunchMain.img, `${lunchMain.item} - ${lunchMain.cal} Cal`)}

      <h6 class='text-warning mt-2'>Other Options</h6>
      ${lunchOptions}

      <h5 class='text-success mt-4'>Dinner (Recommended)</h5>
      ${img(dinnerMain.img, `${dinnerMain.item} - ${dinnerMain.cal} Cal`)}

      <h6 class='text-warning mt-2'>Other Options</h6>
      ${dinnerOptions}

      <h5 class="text-success mt-4">Hydration</h5>
      <p>Drink <strong>${(weightKg * 0.04).toFixed(1)} L</strong> water daily.</p>

      <h5 class="text-success mt-4">Workout Tip</h5>
      <p>20–30 mins of walking / yoga / stretching.</p>
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
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { recommendHandler };




