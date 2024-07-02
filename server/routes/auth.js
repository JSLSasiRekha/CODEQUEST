const router = require('express').Router();
const { login,logout } = require('../controllers/authController');

router.post('/login', login);

router.delete("/logout", logout);

module.exports = router;
