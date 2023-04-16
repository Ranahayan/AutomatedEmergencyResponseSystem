const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//controller for user registeration

const registeruser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedpassword;
  let oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    return res.status(201).json({
      message: "User already exists.",
    });
  }
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  const token = jwt.sign(
    {
      useremail: savedUser.email,
      id: savedUser._id,
    },
    "finalyearproject",
    { expiresIn: "1h" }
  );
  res.status(200).json({ savedUser, token });
};

//controller for login user

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  const existinguser = await User.findOne({ email: email });
  if (existinguser) {
    const validuser = await bcrypt.compare(password, existinguser.password);
    if (!validuser) {
      res.status(400).json({
        message: "Wrong Password",
      });
    } else {
      const token = jwt.sign(
        {
          name: existinguser.name,
          id: existinguser._id,
        },
        "finalyearproject",
        { expiresIn: "1h" }
      );
      res.status(200).json({ existinguser, token });
    }
  } else {
    res.status(404).json({
      message: "User does not exist",
    });
  }
};

//controller to get current user data

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

//controller to updata single user

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;
  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

module.exports = {
  registeruser,
  loginuser,
  updateUser,
  getUser,
};
