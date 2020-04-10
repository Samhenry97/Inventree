import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Auth0 from './plugins/auth0';
import socketio from './plugins/socketio';
import vuetify from './plugins/vuetify';
import './plugins/chartjs';

Vue.config.productionTip = false;

Vue.use(socketio);
Vue.use(Vuetify);
Vue.use(Auth0, {
  domain: 'inventree.auth0.com',
  clientId: '60NWsl3CJvAc4NJFOfJS5C6DNkCbXGyn'
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
