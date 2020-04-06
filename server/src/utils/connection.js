import controllers from '../controllers';
import logger from './logger';

const ROOM_PREFIX = 'user:';

export default class Connection {
  socket = null;
  io = null;
  user = null;
  room = null;

  constructor(socket, io) {
    this.socket = socket;
    this.io = io;

    for (const method in controllers) {
      this.socket.on(method, (...params) => {
        controllers[method](this, ...params);
      });
    }
  }

  login(user) {
    this.user = user;
    this.room = `${ROOM_PREFIX}${user._id}`;
    this.socket.join(this.room);
    logger.info(`New Login: ${user.name}`);
  }

  logout() {
    this.user = null;
    this.room = null;
  }

  send(message, data) {
    this.socket.emit(message, data);
  }

  sendToRoom(message, data) {
    this.io.to(this.room).emit(message, data);
  }
}
