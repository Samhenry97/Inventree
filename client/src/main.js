import Vue from 'vue';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import socketio from './plugins/socketio';
import vuetify from './plugins/vuetify';
import Auth0 from './plugins/auth0';
import Snackbar from './plugins/snackbar';
import Fragment from 'vue-fragment';
import './plugins/chartjs';

Vue.config.productionTip = false;

// Keep store and router in sync
sync(store, router);

Vue.use(Vuetify);
Vue.use(socketio);
Vue.use(Auth0, {
  domain: 'inventree.auth0.com',
  clientId: '60NWsl3CJvAc4NJFOfJS5C6DNkCbXGyn'
});
Vue.use(Snackbar);
Vue.use(Fragment.Plugin);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
