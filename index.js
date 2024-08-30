const express = require("express");
const catagoryRouter = require("./routes/catagory");
const artRouter = require("./routes/art");

const port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.redirect("/arts"));

app.use("/catagories", catagoryRouter);
app.use("/arts", artRouter);

app.listen(port, () =>
  console.log("Server listening on http://localhost:" + port)
);
