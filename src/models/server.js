const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

/* Importaciones propias */
const Sockets = require('./sockets');
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.app = express();

        /* HTTP Server */
        this.server = http.createServer(this.app);

        /* Configuración de sockets */
        this.io = socketio(this.server);

        /* Conexión a la DB */
        this.connectDB();

        /* Middlewares */
        this.middlewares();

        /* Inicializar sockets */
        this.sockets = new Sockets(this.io);
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        /* Desplegar el directorio público */
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        /* CORS */
        this.app.use(cors());
    }

    execute() {
        this.server.listen(this.port, () => {
            console.log('Server on port:', this.port);
        });
    }
}

module.exports = Server;