const mongoose = require("mongoose");

const FontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  family: { type: String, required: true },
  fontFile: { type: String, required: true },
  fontPack: { type: String, required: false },
  fontType: { type: String, required: true },
  author: { type: String, required: false },
  description: { type: String, required: false },
  phonetic: { type: String, required: false },
  license: { type: String, required: false },
});

module.exports = mongoose.model("Font", FontSchema);
