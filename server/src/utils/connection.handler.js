import Connection from './connection';
import logger from './logger';

export default class ConnectionHandler {
  connections = {};
  io = null;

  constructor(io) {
    this.io = io;
    io.on('connection', this.onConnection);
  }

  onConnection = (socket) => {
    this.connections[socket.id] = new Connection(socket, this.io);
    logger.info(`New Connection (${this.totalConnections()} total)`);

    socket.on('disconnect', () => {
      delete this.connections[socket.id];
      logger.info(`New Disconnect (${this.totalConnections()} total)`)
    });
  };

  totalConnections = () =>  Object.keys(this.connections).length;
}
