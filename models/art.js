const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Catagory = require("./catagory");

const Art = db.define("Art", {
  title: DataTypes.STRING,
  catagory_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Catagory,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  image_path: DataTypes.STRING(1000),
});

module.exports = Art;
