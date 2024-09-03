const express = require("express");

const router = express.Router();

const apiController = {};

apiController.category = (req, res) => {
  res.end("category");
};

apiController.addpost = (req, res) => {
  res.end("addpost");
};

apiController.select_cat = (req, res) => {
  res.end("select_cat");
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
