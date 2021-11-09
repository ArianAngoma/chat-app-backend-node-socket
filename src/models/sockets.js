class Sockets {
    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        /* On connection */
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado', socket.id);

            // TODO: Validar JWT

            // TODO: Saber que usuario está activo

            // TODO: Emitir todos los usuarios conectados

            // TODO: Socket join

            // TODO: Escuchar cuando un cliente manda un mensaje

            // TODO: Disconnect
        });
    }
}

module.exports = Sockets;