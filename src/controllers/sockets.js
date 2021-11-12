/* Importaciones propias */
const User = require('../models/User');

/* Actualizar cliente conectado */
const userConnected = async (uid) => {
    return User.findByIdAndUpdate(uid, {online: true}, {new: true});
}

/* Actualizar cliente desconectado */
const userDisconnected = async (uid) => {
    return User.findByIdAndUpdate(uid, {online: false}, {new: true});
}

/* Obtener todos los usuario */
const getUsers = async () => {
    return User.find().sort('-online');
}

module.exports = {
    userConnected,
    userDisconnected,
    getUsers
}