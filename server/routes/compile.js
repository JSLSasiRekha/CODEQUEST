const router = require('express').Router();
const { compile } = require('../controllers/codeController');
const {submitCode}=require('../controllers/codeController')

router.post('/run', compile);
router.post('/submit',submitCode);

module.exports = router;
