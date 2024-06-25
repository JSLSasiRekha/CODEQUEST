const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    // Respond with token and user data
    res.status(200).json({ user: user, token: token, message: "Logged in successfully" });
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
  // delete token
  await Token.findOneAndDelete({ user: req.user.userId });
  // remove cookie
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  
  res.status(StatusCodes.OK).json({ message: "Logged out!!" });
};


module.exports = { login ,logout};
