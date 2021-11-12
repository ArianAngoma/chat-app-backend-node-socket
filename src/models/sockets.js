/* Importaciones propias */
const {checkJWT} = require('../helpers/jwt');

class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        /* On connection */
        this.io.on('connection', (socket) => {
            /* Obtener token del query de socket */
            const token = socket.handshake.query['x-token'];

            /* Comprobar token */
            const [isValid, uid] = checkJWT(token);

            /* Si el token no es válido */
            if (!isValid) {
                console.log('Token no válido');
                return socket.disconnect();
            }

            console.log('Cliente conectado', uid);

            /* Desconectar cliente */
            socket.on('disconnect', () => {
                console.log('Cliente desconectado', uid)
            });
        });
    }
}

module.exports = Sockets;