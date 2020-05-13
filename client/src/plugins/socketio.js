import VueSocketIO from 'vue-socket.io';
import store from '../store';
import dotenv from 'dotenv';
dotenv.config();

export default new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_SOCKET_URL,
  vuex: {
    store,
    actionPrefix: 'live_',
    mutationPrefix: 'live_'
  }
});
