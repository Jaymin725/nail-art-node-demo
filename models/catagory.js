const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Category = db.define("Category", {
  name: {
    type: DataTypes.STRING,
  },
  image_path: {
    type: DataTypes.STRING(1000),
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Category.sync({ alter: true })
  .then(() => console.log("Category table synced successfully."))
  .catch((error) => console.error("Failed to sync Category table:", error));

module.exports = Category;
