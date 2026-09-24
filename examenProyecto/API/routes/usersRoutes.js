const { Router } = require('express');
const { isAuth } = require('../middlewares/auth');
const { verifLike } = require('../middlewares/verificarYaLike');

const { getUsers, registerUser, login,borrarCuenta,darLike } = require ('../controllers/usersControllers')

const router = Router();

router.get('/',isAuth, getUsers);
router.post('/', registerUser);
router.post('/login', login);
router.post('/borrar', isAuth, borrarCuenta);
router.post('/posts/:id/like', isAuth, verifLike, darLike)


module.exports = router;