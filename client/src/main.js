import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import socketio from './plugins/socketio';
import vuetify from './plugins/vuetify';
import Auth0 from './plugins/auth0';
import Snackbar from './plugins/snackbar';
import './plugins/chartjs';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(socketio);
Vue.use(Auth0, {
  domain: 'inventree.auth0.com',
  clientId: '60NWsl3CJvAc4NJFOfJS5C6DNkCbXGyn'
});
Vue.use(Snackbar);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
