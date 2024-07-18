const express = require('express');
const router = express.Router();
const {getAllProblems,getProblemById,getProblemBySlug,updateProblem,deleteProblem,createProblem} = require('../controllers/problemController'); 
const {cpUpload} =require('../multer/multer');

// Multiple problems routes
router.route('/allproblems')
  .get(getAllProblems)
  .post(cpUpload, createProblem)
// Single problem routes

router.route('/:slug')
  .get(getProblemBySlug)
  .put(cpUpload,updateProblem)
  .delete(deleteProblem);


module.exports = router;

