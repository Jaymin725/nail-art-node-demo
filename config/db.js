const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nail_art_node_demo", "root", "", {
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

module.exports = sequelize;
