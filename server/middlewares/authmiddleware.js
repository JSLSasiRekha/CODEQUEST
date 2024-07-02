const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.signedCookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = payload.Tokenuser; // Assuming the token contains user information
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;