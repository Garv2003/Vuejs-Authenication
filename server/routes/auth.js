const express = require("express");
const router = express.Router();

const userController = require("../controllers/auth");
const isLoggedIn = require("../middleware/IsLogged");

router.get("/profile", isLoggedIn, userController.getProfile);
router.get("/", userController.test);
router.get("/logout", userController.getLogout);
router.get("/error", userController.getError);
// router.get("/login", userController.getLogin);

router.post("/signup", userController.postSignUp);

module.exports = router;
