const mongoose = require("mongoose");

const AuthUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("AuthUser", AuthUserSchema);

