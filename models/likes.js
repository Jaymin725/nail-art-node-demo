const { DataTypes } = require("sequelize");
const db = require("../config/db");
const nailart_designModel = require("./nailart_design");

const likesModel = db.define(
  "likes",
  {
    user: DataTypes.STRING(700),
    post: DataTypes.STRING(700),
    date: DataTypes.STRING(1000),
    time: DataTypes.STRING(1000),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = likesModel;
