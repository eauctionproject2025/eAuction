const mongoose = require("mongoose");
const { unique } = require("next/dist/build/utils");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nid: { type: Number, required: true, unique:true, length:10}, // gpt says String
  image: { type: String, default:""},
  role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
