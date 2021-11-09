const jwt = require('jsonwebtoken');

/* Importaciones propias */
const User = require('../models/User');

const validateJwt = async (req, res, next) => {
    /* x-token headers */
    const token = req.header('x-token');

    if (!token) return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
    });

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY_JWT);

        // Leer usuario que corresponde al uid
        const user = await User.findById(uid);
        if (!user) return res.status(401).json({
            ok: false,
            msg: 'Token no válido - usuario no existe en DB'
        });

        req.user = user;

        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            ok: false,
            msg: 'Toke no válido'
        });
    }
}

module.exports = {
    validateJwt
}