const express = require("express");
const router = express.Router();
const {
  registeruser,
  loginuser,
  updateUser,
  getUser,
} = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/authToken");

router.post("/register", registeruser);
router.post("/login", loginuser);
router.put("/updateUser/:id", updateUser);
router.get("/currentUser/:id", getUser);
router.get("/", verifyToken, (req, res) => {
  console.log(req.user);
  res.send("Let move to the home page after getting token");
});

module.exports = router;
