import Snackbar from './Snackbar.vue';

export default {
  install(Vue) {
    const SnackbarClass = Vue.extend(Snackbar);
    const snackbar = new SnackbarClass();
    Vue.prototype.$snackbar = snackbar;
    snackbar.$mount();

    setTimeout(() => {
      document.getElementById('app').appendChild(snackbar.$el);
    }, 0);
  }
};
