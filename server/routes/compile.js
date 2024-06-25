const router = require('express').Router();
const { compile } = require('../controllers/codeController');

router.post('/', compile);

module.exports = router;
