const { DataTypes } = require("sequelize");
const db = require("../config/db");

const registrationModel = db.define(
  "registration",
  {
    user_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(1000), allowNull: true },
    password: DataTypes.STRING(1000),
    email: DataTypes.STRING(100),
    mobileNumber: DataTypes.STRING(1000),
    type: DataTypes.STRING(1000),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = registrationModel;
