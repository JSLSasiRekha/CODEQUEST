const router = require('express').Router();
const {createUser ,getUserDetails,updateUser, showCurrentUser, deleteUser} = require('../controllers/userController');
const verifyToken =require('../middlewares/authmiddleware')


router.post('/', createUser);
router.get('/showMe', verifyToken, showCurrentUser); 
router.get('/:username',getUserDetails) ;
router.put('/:username',updateUser); 
router.delete('/:username',deleteUser)

module.exports = router;
