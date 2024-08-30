const fs = require("fs");
const path = require("path");
const Art = require("../models/art");

async function createArt(req, res) {
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

  await Art.create({ ...req.body, image_path: file_name });

  res.redirect("/arts");
}

async function readAllArts(req, res) {
  const arts = await Art.findAll();
  res.render("dashboard", { page: "arts", arts });
}

async function updateArt(req, res) {
  const art = await Art.findByPk(req.params.id);

  art.set(req.body);

  if (req.file) {
    const {
      filename: temp_name,
      destination: dir,
      originalname: file_name,
    } = req.file;

    fs.unlinkSync(path.format({ dir, base: art.image_path }));

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

    art.image_path = file_name;
  }

  await art.save();

  res.redirect("/arts");
}

async function deleteArt(req, res) {
  const art = await Art.findByPk(req.params.id);

  fs.unlinkSync(
    path.format({
      dir: "./public/images/arts",
      base: art.image_path,
    })
  );

  await art.destroy();

  res.redirect("/arts");
}

module.exports = {
  createArt,
  updateArt,
  deleteArt,
  readAllArts,
};
