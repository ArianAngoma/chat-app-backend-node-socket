/* Importaciones propias */
const Message = require('../models/Message');

/* Obtener mensajes */
const getMessages = async (req, res) => {
    const {id: to} = req.user;
    const {from} = req.params;

    const last30 = await Message.find({
        $or: [
            {from: to, to: from},
            {from, to}
        ]
    }).sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok: true,
        messages: last30
    });
}

module.exports = {
    getMessages
}