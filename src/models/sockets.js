/* Importaciones propias */
const {checkJWT} = require('../helpers/jwt');
const {userConnected, userDisconnected} = require('../controllers/sockets');

class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        /* On connection */
        this.io.on('connection', async (socket) => {
            /* Obtener token del query de socket */
            const token = socket.handshake.query['x-token'];

            /* Comprobar token */
            const [isValid, uid] = checkJWT(token);

            /* Si el token no es válido */
            if (!isValid) {
                console.log('Token no válido');
                return socket.disconnect();
            }

            // console.log('Cliente conectado', uid);

            /* Actualizar usuario si se conecta */
            await userConnected(uid);

            /* Desconectar cliente */
            socket.on('disconnect', async () => {
                // console.log('Cliente desconectado', uid);

                /* Actualizar usuario si se desconecta */
                await userDisconnected(uid);
            });
        });
    }
}

module.exports = Sockets;