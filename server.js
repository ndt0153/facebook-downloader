const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const FacebookAnalytic = require("./download");
const mongoose = require("mongoose");
const dbConnect = require("./db");
const { saveToDB, uniques } = require("./facebook");

app.use(cors());
app.set("view engine", "pug");
global.__basedir = __dirname;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
mongoose.Promise = global.Promise;

let port = 8181;
app.listen(port, () => {
  console.log(`Running at port: ${port} `);
});
mongoose
  .connect(dbConnect.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

app.post("/analytics", (req, res, next) => {
  FacebookAnalytic(req.body.link)
    .then((response) => {
      res.render("list", {
        title: "Analytics",
        message: "Hello there!",
        lists: response,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/", (req, res) => {
  res.render("index", {
    title: "Analytics",
    message: "Hello there!",
  });
});
app.get("/download", (req, res) => {
  req = req.query;
  FacebookAnalytic()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("/test", (req, res) => {
  req = req.query;
  res.send(response);
});
