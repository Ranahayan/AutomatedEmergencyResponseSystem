const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      error: "Please login first",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "finalyearproject", async (error, payload) => {
    if (error) {
      return res.status(401).send({
        error: "You must login in, invalid token",
      });
    }
    const { id } = payload;
    const user = await User.findById(id);
    if (user) {
      req.user = user;
      next();
    }
  });
};

module.exports = {
  verifyToken,
};
