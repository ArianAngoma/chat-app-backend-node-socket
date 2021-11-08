const bcrypt = require('bcryptjs');

/* Importaciones propias */
const User = require('../models/User');

/* Registro de usuario */
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});

        /* Encriptar password */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        /* Guardar en DB */
        await user.save();

        res.status(201).json({
            ok: true,
            user
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

/* Iniciar sesión de usuario */
const loginUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'SignIn'
    });
}

/* Revalidar Token de usuario */
const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'Renew'
    });
}

module.exports = {
    registerUser,
    loginUser,
    renewToken
}