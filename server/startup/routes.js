const express = require("express");
const cors = require("cors");
const AuthRoutes = require("../routes/authRoutes");
const contactRoutes = require("../routes/contactRoutes");
const bodyParser = require("body-parser");
const handleUnknoiwnError = require("../middleware/unknownError");

module.exports = function (app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/auth", AuthRoutes);
  app.use("/api/contact", contactRoutes);
  app.use(handleUnknoiwnError);
};
