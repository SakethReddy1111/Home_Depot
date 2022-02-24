require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const { body, validationResult } = require("express-validator");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const items = await User.find().lean().exec();

    res.send(items);
  } catch (er) {
    console.log("ERROR : " + er);
    res.status * (500).send("ERROR : " + er);
  }
});

router.post(
  "/register",
  body("username").notEmpty(),
  body("email").notEmpty().exists().isEmail(),
  body("password").notEmpty().isStrongPassword(),
  async (req, res) => {
    try {
      const foundErrors = validationResult(req);

      if (!foundErrors.isEmpty()) {
        return res.send(foundErrors);
      }

      let user = await User.findOne({ email: req.body.email }).lean().exec();

      if (user)
        return res.status(400).send({ message: "EamilId aldready in use" });

      user = await User.create(req.body);
      const token = newToken(user);

      res.render("login");
    } catch (er) {
      console.log("ERROR : " + er);
      res.status(500).send("ERROR : " + er);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({ message: "Invalid email or password" });
    const match = user.checkPassword(req.body.password);

    if (!match)
      return res.status(400).send({ message: "Invalid email or password" });
    const token = newToken(user);
    res.alert;
    console.log("login succesful");

    res.render("./index");
  } catch (er) {
    console.log("ERROR : " + er);
    res.status(500).send("ERROR : " + er);
  }
});

router.delete("/del/:id", async (req, res) => {
  try {
    const items = await User.findByIdAndDelete(req.params.id).lean().exec();
    res.status(402).send(items);
  } catch (er) {
    console.log("ERROR : " + er);
    res.status(500).send("ERROR : " + er);
  }
});

module.exports = router;
