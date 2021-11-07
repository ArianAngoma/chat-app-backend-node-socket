/*
* Rutas de Usuario / Auth
* host + /api/auth
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {registerUser, loginUser, renewToken} = require('../controllers/auth');

/* Configuración del router */
const router = Router();

/* Registrar usuario */
router.post('/register', registerUser);

/* Iniciar sesión de usuario */
router.post('/', loginUser);

/* Revalidar Token */
router.get('/renew', renewToken);

module.exports = router;