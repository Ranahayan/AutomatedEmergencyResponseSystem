const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 4000;
const app = express();
app.use(bodyParser.json());

//routers
const AuthRoutes = require("./routes/authRoutes");

app.use("/auth", AuthRoutes);

mongoose
  .connect("mongodb://0.0.0.0:27017/FYP")
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`Server is running on port ${port}`));
