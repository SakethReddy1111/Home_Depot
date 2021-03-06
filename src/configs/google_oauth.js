require("dotenv").config();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");

const user = require("../models/user.model");

var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5050/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let items = await user.findOne({ email: profile.email }).lean().exec();

      if (!items) {
        items = await user.create({
          username: profile.name.givenName,
          email: profile.email,
          password: uuidv4(),
        });
      }

      return done(null, items);
    }
  )
);

module.exports = passport;
