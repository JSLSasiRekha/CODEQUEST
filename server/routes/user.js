const router = require('express').Router();
const {createUser ,getUserDetails,updateUser, showCurrentUser} = require('../controllers/userController');
const verifyToken =require('../middlewares/authmiddleware')


router.post('/', createUser);
router.get('/showMe', verifyToken, showCurrentUser); 
router.get('/:username',getUserDetails) ;
router.put('/:username', updateUser); 

module.exports = router;
