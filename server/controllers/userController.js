const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with given email already exists" });

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
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};


const updateUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    if (req.body.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).send({ message: "Email already in use" });
      }
    }

    const updatedData = { ...req.body };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      updatedData.password = await bcrypt.hash(req.body.password, salt);
    } else {
      delete updatedData.password;
    }

    await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
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

module.exports = { createUser, getUserDetails, updateUser,deleteUser };


