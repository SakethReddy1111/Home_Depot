const express = require("express");
const app = express();

const connect = require("./configs/db");
const passport = require("./configs/google_oauth");

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const userController = require("./controllers/user.controller");
app.use("/users", userController);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/homedepot",
    failureRedirect: "/login",
  })
);

app.get("/homedepot", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/diy", (req, res) => {
  res.render("diy");
});

app.get("/login", (req, res) => {
  res.render("login", {
    message: "",
    userEmail: "",
    userPassword: "",
  });
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/carts", (req, res) => {
  res.render("cart_page");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/install-services", (req, res) => {
  res.render("install-services");
});

app.get("/offer", (req, res) => {
  res.render("offer");
});

app.get("/payment_page", (req, res) => {
  res.render("payment_page");
});

app.get("/success_page", (req, res) => {
  res.render("success_page");
});

const port = process.env.PORT || 5050;

app.listen(port, async () => {
  try {
    await connect();
    console.log(`listening on port ${port}`);
  } catch (er) {
    console.log("ERROR : " + er);
  }
});
