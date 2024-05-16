import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function postLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({
        msg: "User does not exist",
        error: "User does not exist",
        status: false,
      });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({
        msg: "Incorrect password",
        error: "Incorrect password",
        status: false,
      });
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      msg: "User logged in",
      accessToken,
      status: true,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Something went wrong",
      error: err,
      status: false,
    });
  }
}

export async function postSignUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(202).send({
        msg: "Email already exists , please login",
        error: "Email already exists",
        status: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(200).send({
      msg: "Account created successfully",
      user: savedUser,
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "Something went wrong",
      error: err,
      status: false,
    });
  }
}

export async function getProfile(req, res) {
  try {
    res.status(200).send({
      msg: "Welcome to the profile route",
      user: req.user,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Something went wrong",
      error: err,
      status: false,
    });
  }
}

export async function deleteProfile(req, res) {
  try {
    await User.deleteOne({ _id: req.user._id });
    res.status(200).send({
      msg: "User deleted successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Something went wrong",
      error: err,
      status: false,
    });
  }
}

export function test(req, res) {
  res.status(200).send({
    msg: "Welcome to the passport authentication system",
  });
}
