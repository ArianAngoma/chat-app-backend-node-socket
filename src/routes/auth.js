/*
* Rutas de Usuario / Auth
* host + /api/auth
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {registerUser, loginUser, renewToken} = require('../controllers/auth');
const {emailExists} = require('../helpers/db-validators');
const {validateFields} = require('../middlewares/validate-fields');

/* Configuración del router */
const router = Router();

/* Registrar usuario */
router.post('/register', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailExists),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validateFields
], registerUser);

/* Iniciar sesión de usuario */
router.post('/', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], loginUser);

/* Revalidar Token */
router.get('/renew', renewToken);

module.exports = router;