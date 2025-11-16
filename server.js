require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err.message));

// only diet API
app.use("/api", require("./routes/api"));

app.get("/", (req, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));





