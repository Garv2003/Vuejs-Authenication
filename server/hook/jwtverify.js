import jwt from "jsonwebtoken";
import User from "../model/user.js";

async function jwtverify(req, res) {
  if (
    req.raw.url === "/login" ||
    req.raw.url === "/register" ||
    req.raw.url === "/test"
  ) {
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.code(401).send({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.code(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.code(401).send({ message: "No user found with this token" });
    }
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.code(401).send({ message: "Token is not valid" });
  }
}

export { jwtverify };
