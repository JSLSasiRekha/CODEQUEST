const router = require('express').Router();
const {getAllSubmission,getSubmissionByuser} = require('../controllers/submissionController');

router.get('/', getAllSubmission);
router.get('/user/:username', getSubmissionByuser); 


module.exports = router;