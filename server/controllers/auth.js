const Users = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports.postSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const emailExist = await Users.findOne({ email });
    if (emailExist)
      return res.status(202).json({
        msg: "Email already exists , please login",
        error: "Email already exists",
        status: false,
      });

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new Users({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(200).json({
      msg: "Account created successfully",
      user: savedUser,
      status: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong",
      error: err,
      status: false,
    });
  }
};

module.exports.getProfile = (req, res, next) => {
  try {
    res.status(200).json({
      msg: "Profile",
      user: req.user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something went wrong",
      error: err,
    });
  }
};

module.exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      res.status(400).json({
        msg: "Something went wrong",
        error: err,
      });
    }
    res.status(200).json({
      msg: "Logged out successfully",
      loggedIn: false,
    });
  });
};

module.exports.test = (req, res, next) => {
  res.status(200).json({
    msg: "Welcome to the passport authentication system",
  });
};
