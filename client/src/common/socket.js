export default class Socket {
  /**
   * Executes all of the socket commands and returns
   * a promise that resolves when all successfully complete.
   * @param {Vue} vm The Vue vm
   * @param {Array} commands The commands
   * @returns {Promise} A promise for all commands
   */
  static all(vm, commands) {
    const promises = [];
    for (const command of commands) {
      promises.push(Socket.one(vm, command));
    }
    return Promise.all(promises);
  }

  /**
   * Executes the socket command
   * @param {Vue} vm The Vue vm
   * @param {string} name The command name/type
   * @param {*} [data] The data for the command
   * @param {string} [success] The success message to display
   * @param {string} [error] The error message to display
   * @returns {Promise} A promise for the command
   */
  static one(vm, { name, data, success, error }) {
    return new Promise((resolve, reject) => {
      vm.$socket.emit(name, data, (type, data) => {
        if (type === 'success') {
          resolve(data);
          if (success) vm.$snackbar.success(success);
        } else {
          reject(data);
          if (error) vm.$snackbar.error(error);
        }
      });
    });
  }
}
