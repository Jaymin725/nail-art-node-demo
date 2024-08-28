const express = require("express");
const multer = require("multer");
const artController = require("../controllers/art");
const Art = require("../models/art");
const Catagory = require("../models/catagory");

const router = express.Router();

const upload = multer({ dest: "./public/images/arts" });

router.get("/", artController.readAllArts);

router
  .route("/create")
  .get(async (req, res) => {
    const catagories = await Catagory.findAll();
    res.render("art-create", { catagories });
  })
  .post(upload.single("image"), artController.createArt);

router
  .route("/update/:id")
  .get(async (req, res) => {
    const art = await Art.findByPk(req.params.id);
    const catagories = await Catagory.findAll();
    res.render("art-update", { art, catagories });
  })
  .post(upload.single("image"), artController.updateArt);

router.get("/delete/:id", artController.deleteArt);

module.exports = router;
