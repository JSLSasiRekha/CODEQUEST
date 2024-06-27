const { User, validate } = require('../models/user');
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcrypt');
require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with given email already exists" });
    const user1 = await User.findOne({ userName:req.body.username });
    if (user1) return res.status(409).send({ message: "User with given username already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username }).select(
      "-password"
    );
    // not found
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No user found with username: ${req.params.username}` });
    
    }
    // checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
  }
   catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  try {

    const user = await User.findOne({ userName: req.params.username });
    if (!user) return res.status(404).send({ message: "User not found" });

    if (req.body.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).send({ message: "Email already in use" });
      }
    }

    if (req.body.userName) {
      const existingUser = await User.findOne({ userName: req.body.userName });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).send({ message: "Username already in use" });
      }
    }

    const updatedData = { ...req.body };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      updatedData.password = await bcrypt.hash(req.body.password, salt);
    } else {
      delete updatedData.password;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updatedData, { new: true });
    res.status(200).send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { showCurrentUser,createUser, getUserDetails, updateUser,deleteUser };


