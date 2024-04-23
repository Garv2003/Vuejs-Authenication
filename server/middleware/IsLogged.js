module.exports = (req, res, next) => {
  if (req.user) return next();
  res.status(400).json({
    msg: "You are not logged in",
  });
};
