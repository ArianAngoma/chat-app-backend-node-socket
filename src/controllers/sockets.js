/* Importaciones propias */
const User = require('../models/User');

/* Actualizar cliente conectado */
const userConnected = async (uid) => {
    return User.findByIdAndUpdate(uid, {online: true}, {new: true});
}

/* Actualizar cliente desconectado */
const userDisconnected = (uid) => {
    return User.findByIdAndUpdate(uid, {online: false}, {new: true});
}

module.exports = {
    userConnected,
    userDisconnected
}