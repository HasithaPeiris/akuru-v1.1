const mongoose = require("mongoose");

const FontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  family: { type: String, required: true },
  fontFile: { type: String, required: true },
});

module.exports = mongoose.model("Font", FontSchema);
