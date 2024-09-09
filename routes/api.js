const express = require("express");
const sequelize = require("sequelize");
const db = require("../config/db");
const categoryModel = require("../models/catagory");
const postModel = require("../models/post");
const { nailart_designModel, likesModel } = require("../models/associations");

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

  nailart_design.save();

  res.json({ data: [{ value: nextId }] });

  // res.json(nailart_design);
  // res.end("addpost");
};

apiController.select_cat = async (req, res) => {
  const category = await categoryModel.findByPk(req.query.id);
  category.img = "http://pragmanxt.com/apps/nailart/uploads/" + category.img;
  res.json({ data: [category] });
};

apiController.nailart_design = async (req, res) => {
  try {
    const { user, cat_id: catId } = req.query;

    // Fetch nail art designs with likes count and filtering
    const designs = await nailart_designModel.findAll({
      attributes: {
        include: [
          // Subquery to count the number of likes for each design
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM likes
              WHERE likes.post = nailart_design.id
            )`),
            "likes", // Alias for the count
          ],
          // User associated with likes, if any
          [
            sequelize.literal(`(
              SELECT user
              FROM likes
              WHERE likes.post = nailart_design.id
              AND likes.user = '${user}'
            )`),
            "user", // Alias for the user
          ],
        ],
      },
      where: {
        cat_id: catId,
        status: "active",
      },
      group: ["nailart_design.id"],
      order: [[sequelize.literal("likes"), "DESC"]], // Order by likes count in descending order
    });

    // Respond with the fetched designs
    designs.forEach((design) => {
      design.img = "http://pragmanxt.com/apps/nailart/uploads/" + design.img;
    });

    res.status(200).json({ data: designs });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching nail art designs:", error);
    res.status(500).json({ error: "An error occurred while fetching designs" });
  }
};

apiController.search = async (req, res) => {
  const designs = await nailart_designModel.findAll({
    attributes: {
      include: [
        // Subquery to count the number of likes for each design
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM likes
            WHERE likes.post = nailart_design.id
          )`),
          "likes", // Alias for the count
        ],
        // User associated with likes, if any
        [
          sequelize.literal(`(
            SELECT user
            FROM likes
            WHERE likes.post = nailart_design.id
            AND likes.user = '${req.query.user}'
          )`),
          "user", // Alias for the user
        ],
      ],
    },
    where: {
      title: {
        [sequelize.Op.like]: `%${req.query.title}%`, // Filtering based on title
      },
      status: "active", // Filtering based on status
    },
    group: ["nailart_design.id"], // Group by the main table's id
    order: [[sequelize.literal("likes"), "DESC"]], // Order by the likes count
  });

  designs.forEach((design) => {
    design.img = "http://pragmanxt.com/apps/nailart/uploads/" + design.img;
  });

  res.json({ data: designs });
};

apiController.likes = async (req, res) => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "/");
  console.log(formattedDate);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  let countLikes = await likesModel.count({
    where: {
      post: req.query.post,
    },
  });

  const like_status = await likesModel.findAll({
    where: {
      user: req.query.user,
      post: req.query.post,
    },
  });

  if (like_status.length < 1) {
    const newLike = likesModel.create({
      user: req.query.user,
      post: req.query.post,
      date: formattedDate,
      time: currentTime,
    });
    countLikes++;
  }

  res.json({ data: [{ status: "like", likes: countLikes }] });
};

apiController.unlikes = async (req, res) => {
  let countLikes = await likesModel.count({
    where: {
      post: req.query.post,
    },
  });

  const like_status = await likesModel.findAll({
    where: {
      user: req.query.user,
      post: req.query.post,
    },
  });

  if (like_status.length > 0) {
    await likesModel.destroy({
      where: {
        user: req.query.user,
        post: req.query.post,
      },
    });
    countLikes--;
  }

  res.json({ data: [{ status: "unlike", likes: countLikes }] });
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
