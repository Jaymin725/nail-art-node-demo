const { DataTypes } = require("sequelize");
const db = require("../config/db");

const categoryModel = db.define(
  "category",
  {
    cat_name: DataTypes.STRING(1000),
    img: DataTypes.STRING(1000),
    description: DataTypes.STRING(1000),
    status: DataTypes.STRING(1000),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = categoryModel;
