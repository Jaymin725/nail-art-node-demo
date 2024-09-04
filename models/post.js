const { DataTypes } = require("sequelize");
const db = require("../config/db");

const postModel = db.define("post", {});

module.exports = postModel;
