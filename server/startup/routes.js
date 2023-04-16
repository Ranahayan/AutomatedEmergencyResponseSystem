const express = require("express");
const cors = require("cors");
const AuthRoutes = require("../routes/authRoutes");
const contactRoutes = require("../routes/contactRoutes");
const bodyParser = require("body-parser");
const handleUnknoiwnError = require("../middleware/unknownError");

module.exports = function (app) {
  app.use(
    cors({
      origin: "*",
      methods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS"],
      allowedHeaders: "*",
    })
  );
  app.use(express.json());
  app.use("/auth", AuthRoutes);
  app.use("/api/contact", contactRoutes);
  app.use(handleUnknoiwnError);
};
