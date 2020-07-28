import controllers from '../controllers';
import logger from './logger';

const ROOM_PREFIX = 'user:';

export default class Connection {
  socket = null;
  io = null;
  user = null;

  constructor(socket, io) {
    this.socket = socket;
    this.io = io;

    for (const method in controllers) {
      this.socket.on(method, (data, callback) => {
        controllers[method](this, data)
            .then(data => callback('success', data))
            .catch(err => {
              logger.error(`Socket method error (${method}): ${err}`);
              callback('error', err);
            });
      });
    }
  }

  async call(method, data) {
    return await controllers[method](this, data);
  }

  roomName(user) {
    return `${ROOM_PREFIX}${user}`;
  }

  login(user) {
    const room = this.roomName(user._id);
    this.user = user._id;
    this.socket.join(room);
    logger.info(`New Login: ${user.name}`);
  }

  logout() {
    this.user = null;
  }

  send(message, data) {
    this.socket.emit(message, data);
  }

  sendToRoom(message, data) {
    const room = this.roomName(this.user);
    this.io.to(room).emit(message, data);
  }

  sendToUser(user, message, data) {
    const room = this.roomName(user);
    console.warn(room);
    this.io.to(room).emit(message, data);
  }
}
