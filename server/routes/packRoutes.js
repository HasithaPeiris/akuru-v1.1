const express = require("express");
const router = express.Router();
const {
  addPack,
  updatePack,
  deletePack,
  getPack,
  getPacks,
} = require("../controllers/packController");

router.route("/").get(getPacks).post(addPack);

router.route("/:name").get(getPack);

router.route("/:id").put(updatePack).delete(deletePack);

module.exports = router;
