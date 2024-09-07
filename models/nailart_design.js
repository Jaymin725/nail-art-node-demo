const { DataTypes } = require("sequelize");
const db = require("../config/db");
const likesModel = require("./likes");

const nailart_designModel = db.define(
  "nailart_design",
  {
    cat_id: DataTypes.STRING(700),
    title: DataTypes.STRING(767),
    img: DataTypes.STRING(1000),
    posted_by: DataTypes.STRING(700),
    status: DataTypes.STRING(700),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = nailart_designModel;
