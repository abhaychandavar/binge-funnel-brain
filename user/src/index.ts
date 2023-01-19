const path = require('path');
console.log('DIRNAME: ', __dirname);
require('dotenv').config({
  path: path.resolve(__dirname, './env/.env'),
});
console.log('PROCESS: ', process.env.NAME);

import mongoose from 'mongoose';
import CONFIG from './config/config';

// Module dependencies.
var app = require('./app');
var debug = require('debug')('reference:server');
var http = require('http');
var cors = require('cors');

// Cors
const corsOptions = CONFIG.APP.CORS_OPTIONS;
app.use(cors(corsOptions));

// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

// Connect to mongo
console.log('MONGO DB URI: ', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI || '');

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');

  // Start server
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// Normalize a port into a number, string, or false.
function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error: { syscall: string; code: any }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
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

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// On node process end
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});
