const express = require("express");
const router = express.Router();
const { registeruser, loginuser } = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/authToken");

router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/", verifyToken, (req, res) => {
  console.log(req.user);
  res.send("Let move to the home page after getting token");
});

module.exports = router;
