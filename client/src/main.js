import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import Auth0 from './plugins/auth0';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8000',
  vuex: {
    store,
    actionPrefix: 'live_',
    mutationPrefix: 'live_'
  }
}));

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
