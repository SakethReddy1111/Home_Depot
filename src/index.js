const express = require("express");
const app = express();

const connect = require("./configs/db");

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const userController = require("./controllers/user.controller");
app.use("/users", userController);

app.get("/homedepot", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/cart", (req, res) => {
  res.render("cart_page");
});

app.listen(5050, async () => {
  try {
    await connect();
    console.log("AT 5050");
  } catch (er) {
    console.log("ERROR : " + er);
  }
});
