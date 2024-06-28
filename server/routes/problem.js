const express = require('express');
const router = express.Router();
const {getAllProblems,getProblemById,getProblemBySlug,updateProblem,deleteProblem,createProblem} = require('../controllers/problemController'); 
const {cpUpload} =require('../multer/multer');


// Single problem routes
router.route('/:id')
  .get(getProblemById)
  .put(updateProblem)
  .delete(deleteProblem);

// Multiple problems routes
router.route('/allproblems')
  .get(getAllProblems)
  .post(cpUpload, createProblem)

// Problem by slug or ID routes
router.get('/:slug', getProblemBySlug);


module.exports = router;

