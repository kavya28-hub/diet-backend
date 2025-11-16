require("dotenv").config();       // ⭐ REQUIRED for OPENAI_API_KEY

const UserProfile = require("../models/UserProfile");
const OpenAI = require("openai");

// Set up AI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Meal and BMI logic
function generateRecommendation({ heightCm, weightKg, age, goal, foodPreference }) {
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let message = `<h4 class='text-success mb-3'>Your BMI: ${bmi}</h4>`;

  if (bmi < 18.5) message += "<p>You are underweight. Focus on high-protein, calorie-dense meals.</p>";
  else if (bmi < 24.9) message += "<p>You have a healthy weight. Maintain balanced eating habits.</p>";
  else message += "<p>You are overweight. Try a calorie deficit and low-carb diet.</p>";

  if (age < 18)
    message += "<p class='mt-1'><strong>Note:</strong> Consult a professional since you're a minor.</p>";
  else if (age >= 60)
    message += "<p class='mt-1'><strong>Note:</strong> Seniors should eat easy-to-digest foods.</p>";

  const img = (src, text) =>
    `<div class='col-md-4'><img src='${src}' class='img-fluid rounded shadow'><p class='mt-2'>${text}</p></div>`;

  let meals = "";

  if (goal === "gain") {
    if (foodPreference === "veg") {
      meals = `
        <div class='row g-3 mt-4'>
          ${img('https://images.unsplash.com/photo-1604908177307-818da3a68f7c?auto=format&fit=crop&w=600&q=80','Breakfast: Oats + Milk + Banana')}
          ${img('https://images.unsplash.com/photo-1603052875799-19f32f7bdb6b?auto=format&fit=crop&w=600&q=80','Lunch: Paneer curry + rice')}
          ${img('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80','Dinner: Lentil soup + roti')}
        </div>`;
    } else {
      meals = `
        <div class='row g-3 mt-4'>
          ${img('https://images.unsplash.com/photo-1604908177307-818da3a68f7c?auto=format&fit=crop&w=600&q=80','Breakfast: Oats + Milk + Banana')}
          ${img('https://images.unsplash.com/photo-1603052875799-19f32f7bdb6b?auto=format&fit=crop&w=600&q=80','Lunch: Grilled chicken + rice')}
          ${img('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80','Dinner: Fish curry + roti')}
        </div>`;
    }
  }

  else if (goal === "lose") {
    if (foodPreference === "veg") {
      meals = `
        <div class='row g-3 mt-4'>
          ${img('https://images.unsplash.com/photo-1584270354949-1b5a1fce3a89?auto=format&fit=crop&w=600&q=80','Breakfast: Spinach-Apple smoothie')}
          ${img('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80','Lunch: Quinoa salad')}
          ${img('https://images.unsplash.com/photo-1510626176961-4b37d6c7a81a?auto=format&fit=crop&w=600&q=80','Dinner: Tofu + Broccoli')}
        </div>`;
    } else {
      meals = `
        <div class='row g-3 mt-4'>
          ${img('https://images.unsplash.com/photo-1584270354949-1b5a1fce3a89?auto=format&fit=crop&w=600&q=80','Breakfast: Spinach-Apple smoothie')}
          ${img('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80','Lunch: Grilled fish + veggies')}
          ${img('https://images.unsplash.com/photo-1510626176961-4b37d6c7a81a?auto=format&fit=crop&w=600&q=80','Dinner: Chicken salad')}
        </div>`;
    }
  }

  else {
    if (foodPreference === "veg") {
      meals = `
        <div class='row g-3 mt-4'>
          ${img('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80','Breakfast: Avocado toast')}
          ${img('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80','Lunch: Brown rice + lentils')}
          ${img('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=600&q=80','Dinner: Paneer tikka salad')}
        </div>`;
    } else {
      meals = `
        <div class='row g-3 mt-4'>
          ${img('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80','Breakfast: Eggs + avocado toast')}
          ${img('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80','Lunch: Brown rice + chicken')}
          ${img('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=600&q=80','Dinner: Grilled fish + salad')}
        </div>`;
    }
  }

  return { bmi, summary: message, mealsHtml: meals };
}

// Controller handler
async function recommendHandler(req, res) {
  try {
    const { heightCm, weightKg, age, goal, foodPreference } = req.body;

    const rec = generateRecommendation({ heightCm, weightKg, age, goal, foodPreference });

    let aiSummary = "";

    try {
      const prompt = `
Give a short personalized diet guidance for:
Age: ${age}
Height: ${heightCm}
Weight: ${weightKg}
BMI: ${rec.bmi}
Goal: ${goal}
Food Preference: ${foodPreference}
Write in simple friendly language.
      `;

      const aiRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      });

      aiSummary = aiRes.choices[0].message.content;

    } catch (err) {
      console.log("AI failed but continuing:", err.message);
    }

    const profile = new UserProfile({
      heightCm, weightKg, age, goal, foodPreference,
      bmi: rec.bmi,
      recommendation: {
        summary: rec.summary,
        mealsHtml: rec.mealsHtml,
        aiSummary
      }
    });

    await profile.save();

    res.json({
      success: true,
      recommendation: {
        summary: rec.summary,
        mealsHtml: rec.mealsHtml,
        aiSummary
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { recommendHandler };
