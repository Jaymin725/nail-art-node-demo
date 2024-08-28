const express = require("express");
const multer = require("multer");
const catagoryController = require("../controllers/catagory");
const Catagory = require("../models/catagory");

const router = express.Router();

const upload = multer({ dest: "./public/images/catagories" });

router.get("/", catagoryController.readAllCatagories);

router
  .route("/create")
  .get((req, res) => res.render("catagory-create"))
  .post(upload.single("image"), catagoryController.createCatagory);

router
  .route("/update/:id")
  .get(async (req, res) => {
    const catagory = await Catagory.findByPk(req.params.id);
    res.render("catagory-update", { catagory });
  })
  .post(upload.single("image"), catagoryController.updateCatagory);

router.get("/delete/:id", catagoryController.deleteCatagory);

module.exports = router;
