/* Importaciones propias */
const User = require('../models/User');
const Message = require('../models/Message');

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

/* Guardar mensaje en la DB */
const saveMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();

        return message;
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    getUsers,
    saveMessage
}