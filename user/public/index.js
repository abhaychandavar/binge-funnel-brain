"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
console.log('DIRNAME: ', __dirname);
require('dotenv').config({
    path: path.resolve(__dirname, './env/.env'),
});
console.log('PROCESS: ', process.env.NAME);
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
var app = require('./app');
var debug = require('debug')('reference:server');
var http = require('http');
var cors = require('cors');
const corsOptions = config_1.default.APP.CORS_OPTIONS;
app.use(cors(corsOptions));
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
var server = http.createServer(app);
console.log('MONGO DB URI: ', process.env.MONGO_URI);
mongoose_1.default.connect(process.env.MONGO_URI || '');
mongoose_1.default.connection.on('connected', function () {
    console.log('Mongoose default connection open');
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});
mongoose_1.default.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
process.on('SIGINT', function () {
    mongoose_1.default.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//# sourceMappingURL=index.js.map