const express = require('express');
const router = express.Router();
const {getAllProblems,getProblemById,getProblemBySlug,updateProblem,deleteProblem,createProblem} = require('../controllers/problemController'); 
const {cpUpload} =require('../multer/multer');

// Multiple problems routes
router.route('/allproblems')
  .get(getAllProblems)
  .post(cpUpload, createProblem)
// Single problem routes
router.get('/:slug', getProblemBySlug);
router.route('/:id')
  .get(getProblemById)
  .put(updateProblem)
  .delete(deleteProblem);
  // Problem by slug or ID routes







module.exports = router;

