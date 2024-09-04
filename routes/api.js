const express = require("express");
const categoryModel = require("../models/catagory");

const router = express.Router();

const apiController = {};

apiController.category = async (req, res) => {
  const categories = await categoryModel.findAll();
  categories.forEach(
    (category) =>
      (category.img =
        "http://pragmanxt.com/apps/nailart/uploads/" + category.img)
  );
  res.json({ data: categories });
};

apiController.addpost = (req, res) => {
  res.end("addpost");
};

apiController.select_cat = async (req, res) => {
  const category = await categoryModel.findByPk(req.query.id);
  category.img = "http://pragmanxt.com/apps/nailart/uploads/" + category.img;
  res.json({ data: [category] });
};

apiController.nailart_design = (req, res) => {
  res.end("nailart_design");
};

apiController.search = (req, res) => {
  res.end("search");
};

apiController.likes = (req, res) => {
  res.end("likes");
};

apiController.unlikes = (req, res) => {
  res.end("unlikes");
};

apiController.uploadImage1 = (req, res) => {
  res.end("uploadImage1");
};

apiController.uploadImage = (req, res) => {
  res.end("uploadImage");
};

router.get("/", (req, res) =>
  (
    apiController[req.query.action] ||
    ((req, res) => res.status(404).end(`${req.query.action}: Action not found`))
  )(req, res)
);

module.exports = router;
