const express = require("express");
const db = require("../config/db");
const categoryModel = require("../models/catagory");
const postModel = require("../models/post");
const nailart_designModel = require("../models/nailart_design");

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

apiController.addpost = async (req, res) => {
  const nailart_design = await nailart_designModel.build({
    cat_id: req.query.cat_id,
    img: req.query.img,
    posted_by: req.query.posted_by,
    status: "deactive",
  });
  const result = await db.query(
    "SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM nailart_design",
    { type: db.QueryTypes.SELECT }
  );
  const category = await categoryModel.findByPk(req.query.cat_id);

  const { nextId } = result[0];
  nailart_design.id = nextId;
  nailart_design.title = category.cat_name + nextId;
  res.json(nailart_design);

  // res.json(nailart_design);
  // res.end("addpost");
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
