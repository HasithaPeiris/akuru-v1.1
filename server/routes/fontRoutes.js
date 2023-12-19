const express = require("express");
const router = express.Router();
const {
  addFont,
  updateFont,
  deleteFont,
  getFont,
  getFonts,
} = require("../controllers/fontController");

router.route("/").get(getFonts).post(addFont);

router.route("/:name").get(getFont);

router.route("/:id").put(updateFont).delete(deleteFont);

module.exports = router;
