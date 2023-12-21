const Pack = require("../models/packModel");

// @desc    Add Pack
// @route   POST /api/packs
// @access  Private
const addPack = async (req, res) => {
  const newPack = new Pack(req.body);

  try {
    const savedPack = await newPack.save();
    res.status(200).json(savedPack);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Update Pack by ID
// @route   PUT /api/packs/:id
// @access  Private
const updatePack = async (req, res) => {
  try {
    const updatedPack = await Pack.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPack);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Delete Pack by ID
// @route   DELETE /api/packs/:id
// @access  Private
const deletePack = async (req, res) => {
  try {
    await Pack.findByIdAndDelete(req.params.id);
    res.status(200).json("Pack has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Get Pack by ID
// @route   GET /api/packs/:id
// @access  Public
const getPack = async (req, res) => {
  try {
    const pack = await Pack.findOne({ name: req.params.name });

    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }

    res.status(200).json(pack);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Get Packs
// @route   GET /api/packs
// @access  Public
const getPacks = async (req, res) => {
  try {
    const packs = await Pack.find();

    res.status(200).json(packs);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addPack,
  updatePack,
  deletePack,
  getPack,
  getPacks,
};
