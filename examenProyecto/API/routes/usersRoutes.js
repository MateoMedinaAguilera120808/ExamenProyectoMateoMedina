const { Router } = require('express');
const { isAuth } = require('../middlewares/auth');

const { getUsers, registerUser, login } = require ('../controllers/usersControllers')

const router = Router();

router.get('/',isAuth, getUsers);
router.post('/', registerUser);
router.post("/login", login);


module.exports = router;