const router = require('express').Router();
const { createUser ,getUserDetails,updateUser} = require('../controllers/userController');

router.post('/', createUser);
router.get('/:id', getUserDetails);
router.put('/:id', updateUser);

module.exports = router;
