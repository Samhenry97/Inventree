import VueSocketIO from 'vue-socket.io';
import store from '../store';

export default new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8000',
  vuex: {
    store,
    actionPrefix: 'live_',
    mutationPrefix: 'live_'
  }
});
