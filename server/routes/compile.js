const router = require('express').Router();
const { compile } = require('../controllers/codeController');

router.post('/run', compile);

module.exports = router;
