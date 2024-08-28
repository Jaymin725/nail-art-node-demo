const fs = require("fs");
const path = require("path");
const Catagory = require("../models/catagory");

async function createCatagory(req, res) {
  const {
    filename: temp_name,
    destination: dir,
    originalname: file_name,
  } = req.file;

  fs.renameSync(
    path.format({
      dir,
      base: temp_name,
    }),
    path.format({
      dir,
      base: file_name,
    })
  );

  await Catagory.create({ ...req.body, image_path: file_name });

  res.redirect("/catagories");
}

async function readAllCatagories(req, res) {
  const catagories = await Catagory.findAll();
  res.render("catagory", { catagories });
}

async function updateCatagory(req, res) {
  const catagory = await Catagory.findByPk(req.params.id);

  catagory.set(req.body);

  if (req.file) {
    const {
      filename: temp_name,
      destination: dir,
      originalname: file_name,
    } = req.file;

    fs.unlinkSync(path.format({ dir, base: catagory.image_path }));

    fs.renameSync(
      path.format({
        dir,
        base: temp_name,
      }),
      path.format({
        dir,
        base: file_name,
      })
    );

    catagory.image_path = file_name;
  }

  await catagory.save();

  res.redirect("/catagories");
}

async function deleteCatagory(req, res) {
  const catagory = await Catagory.findByPk(req.params.id);

  fs.unlinkSync(
    path.format({
      dir: "./public/images/catagories",
      base: catagory.image_path,
    })
  );

  await catagory.destroy();

  res.redirect("/catagories");
}

module.exports = {
  createCatagory,
  updateCatagory,
  deleteCatagory,
  readAllCatagories,
};
