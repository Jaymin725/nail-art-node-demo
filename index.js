const express = require("express");
const catagoryRouter = require("./routes/catagory");
const artRouter = require("./routes/art");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.use("/catagories", catagoryRouter);
app.use("/arts", artRouter);

app.listen(port, () =>
  console.log("Server listening on http://localhost:" + port)
);
