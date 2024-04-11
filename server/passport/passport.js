const passport = require("passport");
const LocalStrategy = require("passport-local");
const Users = require("../model/user");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      let user = await Users.findOne({
        email: username,
      });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        }
        return done(null, false);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    let user = await Users.findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
