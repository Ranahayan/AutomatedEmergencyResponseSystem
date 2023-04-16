const express = require("express");
const mongoose = require("mongoose");
const port = 4000;
const app = express();
require("express-async-errors");

//routers
const logger = require("./startup/logger");
mongoose
  .connect("mongodb://0.0.0.0:27017/FYP")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

require("./startup/routes")(app);
require("./startup/validation");

app.listen(port, () => console.log(`Server is running on port ${port}`));
