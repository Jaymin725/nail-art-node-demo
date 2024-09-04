const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pragmanx_nail_art", "root", "", {
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
