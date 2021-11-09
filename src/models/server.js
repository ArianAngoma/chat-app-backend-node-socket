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

        this.path = {
            auth: '/api/auth',
            messages: '/api/messages'
        }

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

        /* Rutas de la App */
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        /* Lectura y parseo del body */
        this.app.use(express.json());

        /* Desplegar el directorio público */
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        /* CORS */
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.messages, require('../routes/message'));
    }

    execute() {
        this.server.listen(this.port, () => {
            console.log('Server on port:', this.port);
        });
    }
}

module.exports = Server;