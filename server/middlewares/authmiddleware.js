const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const payload = jwt.verify(JSON.stringify(token), process.env.JWT_SECRET);
    console.log("decoded",payload);
    req.user = payload.user; // Assuming the token contains user information
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;