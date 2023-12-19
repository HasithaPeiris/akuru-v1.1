const Font = require("../models/fontModel");

// @desc    Add Font
// @route   POST /api/fonts
// @access  Private
const addFont = async (req, res) => {
  const newFont = new Font(req.body);

  try {
    const savedFont = await newFont.save();
    res.status(200).json(savedFont);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Update Font by ID
// @route   PUT /api/fonts/:id
// @access  Private
const updateFont = async (req, res) => {
  try {
    const updatedFont = await Font.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFont);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Delete Font by ID
// @route   DELETE /api/fonts/:id
// @access  Private
const deleteFont = async (req, res) => {
  try {
    await Font.findByIdAndDelete(req.params.id);
    res.status(200).json("Font has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Get Font by ID
// @route   GET /api/fonts/:id
// @access  Public
const getFont = async (req, res) => {
  try {
    const font = await Font.findOne({ name: req.params.name });

    if (!font) {
      return res.status(404).json({ message: "Font not found" });
    }

    res.status(200).json(font);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Get Fonts
// @route   GET /api/fonts
// @access  Public
const getFonts = async (req, res) => {
  try {
    const fonts = await Font.find();

    res.status(200).json(fonts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addFont,
  updateFont,
  deleteFont,
  getFont,
  getFonts,
};
