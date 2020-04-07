import Vue from 'vue';
import Vuex from 'vuex';
import books from './books.module';
import user from './user.module';
import shelves from './shelves.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    books,
    user,
    shelves
  }
})