const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  session({
    secret: "sajdasdasbdaskfbabfiab",
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

require("./passport/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan("tiny"));

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/error",
    successRedirect: "/profile",
  })
);

app.use("/", require("./routes/auth"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 4444, () => {
      console.log(`Server is running on port ${process.env.PORT || 4444}`);
    });
  })
  .catch((err) => console.log(err));
