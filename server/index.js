const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/AutomatedEmergencyResponseSystem")
  .then((result) => console.log("Connected to db"))
  .catch((error) => console.log("Error: ", error.message));
// 
//   const port
