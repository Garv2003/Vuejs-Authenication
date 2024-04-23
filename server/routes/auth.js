const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/auth");
const isLoggedIn = require("../middleware/IsLogged");

router
  .get("/profile", isLoggedIn, userController.getProfile)
  .get("/", userController.test)
  .get("/logout", userController.getLogout)
  .get("/error", userController.getError);

router
  .post("/signup", userController.postSignUp)
  .post("/login", passport.authenticate("local"), userController.postLogin);

module.exports = router;
