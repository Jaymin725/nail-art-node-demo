const express = require("express");
const multer = require("multer");
const catagoryController = require("../controllers/catagory");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "public/images/catagory");
//   },
//   filename: function (req, file, callback) {
//     callback(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });
const upload = multer({ dest: "./uploads/" });

router.get("/create", (req, res) => res.render("catagory-create"));

router.post("/", upload.single("image"), catagoryController.createCatagory);

module.exports = router;
