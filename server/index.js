// const express = require("express");
// const app = express();
// const session = require("express-session");
// const cors = require("cors");
// const passport = require("passport");
// const mongoose = require("mongoose");
// const MongoStore = require("connect-mongo");
// const compression = require("compression");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const dotenv = require("dotenv");

// dotenv.config();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// // const mongoClientPromise = new Promise((resolve) => {
// //   mongoose.connection.on("connected", () => {
// //     const client = mongoose.connection.getClient();
// //     resolve(client);
// //   });
// // });

// // const sessionStore = MongoStore.create({
// //   clientPromise: mongoClientPromise,
// //   collection: "sessions",
// // });

// // app.use(
// //   session({
// //     secret: "sajdasdasbdaskfbabfiabbjbjhvjv",
// //     saveUninitialized: false,
// //     resave: false,
// //     store: sessionStore,
// //   })
// // );

// // app.use(passport.initialize());
// // app.use(passport.session());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(compression());
// app.use(helmet());
// app.use(morgan("tiny"));

// require("./passport/passport");
// app.use("/", require("./routes/auth"));

// const express = require("express");
// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const compression = require("compression");
// const dotenv = require("dotenv");
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const User = require("./model/user");

// dotenv.config();

// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.use(morgan("tiny"));
// app.use(compression());
// app.use(passport.initialize());

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET, // Use environment variable for JWT secret
// };

// passport.use(
//   new JwtStrategy(jwtOptions, async (payload, done) => {
//     try {
//       const user = await UserModel.findById(payload.id);
//       if (user) return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// app.post("/register", async (req, res, next) => {
//   try {
//     const user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     return res.status(201).json({
//       message: "user created",
//       user: { email: user.email, id: user._id },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/login", async (req, res, next) => {
//   console.log(req.body);
//   try {
//     const userExists = await User.findOne({ email: req.body.email });
//     console.log(userExists);
//     if (!userExists)
//       return res.status(400).json({ message: "user does not exist" });

//     if (userExists.password !== req.body.password)
//       return res.status(400).json({ message: "incorrect password" });

//     const accessToken = jwt.sign(
//       {
//         id: userExists._id,
//       },
//       "secret",
//       { expiresIn: "1d" }
//     );

//     return res
//       .status(200)
//       .json({ message: "user logged in", accessToken: accessToken });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// app.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     try {
//       return res
//         .status(200)
//         .json({ userId: req.user._id, email: req.user.email });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );

import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyCompress from "@fastify/compress";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { jwtverify } from "./hook/jwtverify.js";

dotenv.config();

const app = fastify({
  // logger: true,
});

app.register(fastifyCors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});
app.register(fastifyCompress);
app.register(fastifyHelmet);

app.addHook("onRequest", jwtverify);
app.register(import("./routes/auth.js"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    try {
      await app.listen({ port: process.env.PORT || 4444 });
      console.log(`Server is running on ${app.server.address().port}`);
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => console.log(err));
