const Catagory = require("../models/catagory");

function createCatagory(req, res) {
  const data = req.body;
  data.file = req.file;
  res.json(data);
}

module.exports = { createCatagory };
