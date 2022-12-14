module.exports = (req, next) => {
  req.admin = req.get("admin");
  next();
};
