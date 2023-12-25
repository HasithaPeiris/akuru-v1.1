const mongoose = require("mongoose");

const PackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  packName: { type: String, required: true },
  fonts: { type: [String], required: true },
  packType: { type: String, required: false },
  author: { type: String, required: false },
  description: { type: String, required: false },
  license: { type: String, required: false },
});

module.exports = mongoose.model("Pack", PackSchema);
