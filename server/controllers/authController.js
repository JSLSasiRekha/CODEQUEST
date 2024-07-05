const { User } = require('../models/user');
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {});
  return token;
};
const createTokenUser = (user) => {
  return {
    userName: user.userName,
    userId: user._id,
    email: user.email,
    firstName:user.firstName,
    lastName:user.lastName,
    role:user.role,
  };
};

const login = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid email or password" });
    const Tokenuser=createTokenUser(user)
    const accessTokenJWT = createJWT({ payload: {Tokenuser } });
    user.token=accessTokenJWT;
    user.save();
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("accessToken", accessTokenJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
      expires: new Date(Date.now() + oneDay),
    });

    // Respond with token and user data
    res.status(200).json({ user: Tokenuser, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};
const logout = async (req, res) => {
  
  // remove cookie
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  
  res.status(StatusCodes.OK).json({ message: "Logged out!!" });
};


module.exports = { login ,logout};
