/*
* Rutas de Mensajes / Message
* host + /api/messages
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {validateJwt} = require('../middlewares/validate-jwt');
const {validateFields} = require('../middlewares/validate-fields');
const {getMessages} = require('../controllers/message');

/* Configuración del router */
const router = Router();

router.get('/:from', [
    validateJwt,
    check('from', 'No es un ID válido').isMongoId(),
    validateFields
], getMessages);


module.exports = router;