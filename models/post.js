const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Post = db.define("Post", {});

module.exports = Post;
