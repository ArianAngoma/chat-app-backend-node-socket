const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY_JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else resolve(token);
        });
    });
}

const checkJWT = (token) => {
    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY_JWT);
        return [true, uid];
    } catch (e) {
        console.log(e);
        return [false, null];
    }
}

module.exports = {
    generateJWT,
    checkJWT
}