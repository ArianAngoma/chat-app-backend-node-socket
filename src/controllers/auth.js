/* Registro de usuario */
const registerUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'SignUp'
    });
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