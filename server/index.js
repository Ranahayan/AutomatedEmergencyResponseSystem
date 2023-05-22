const express = require("express");
const mongoose = require("mongoose");
const port = 8080;
const app = express();
require("express-async-errors");

//routers
const logger = require("./startup/logger");
const router = require("./routes/authRoutes");
const contact = require("./routes/contactRoutes");
mongoose
  .connect("mongodb://0.0.0.0:27017/AutomatedEmergencyResponseSystem")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

require("./startup/routes")(app);
require("./startup/validation");
app.use("/auth", router);
app.use("/contact", contact);

app.listen(port, () => console.log(`Server is running on port ${port}`));
