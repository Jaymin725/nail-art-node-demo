const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Category = db.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Category.sync({ alter: true })
  .then(() => console.log("Category table synced successfully."))
  .catch((error) => console.error("Failed to sync Category table:", error));

module.exports = Category;
