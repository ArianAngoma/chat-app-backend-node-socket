/* Importaciones propias */
const {checkJWT} = require('../helpers/jwt');
const {userConnected, userDisconnected, getUsers, saveMessage} = require('../controllers/sockets');

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

            console.log('Cliente conectado', uid);

            /* Actualizar usuario si se conecta */
            await userConnected(uid);

            /* Unir al usuario a una sala de socket.io */
            socket.join(uid);

            /* Emitir todos los usuario */
            this.io.emit('users-list', await getUsers());

            /* Escuchar evento de mensaje personal */
            socket.on('message-personal', async (payload) => {
                // console.log(payload);
                /* Guardar mensaje en la DB */
                const message = await saveMessage(payload);

                /* Emitir mensaje personal */
                this.io.to(payload.to).emit('message-personal', message);
                this.io.to(payload.from).emit('message-personal', message);
            });

            /* Desconectar cliente */
            socket.on('disconnect', async () => {
                console.log('Cliente desconectado', uid);

                /* Actualizar usuario si se desconecta */
                await userDisconnected(uid);

                /* Emitir todos los usuario */
                this.io.emit('users-list', await getUsers());
            });
        });
    }
}

module.exports = Sockets;