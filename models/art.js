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
  },
  image_path: DataTypes.STRING(1000),
});

Art.sync({ alter: true })
  .then(() => console.log("Art table synced successfully."))
  .catch((error) => console.error("Failed to sync Art table:", error));

module.exports = Art;
