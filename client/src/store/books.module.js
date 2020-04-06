import { M_CREATE_BOOK, M_DELETE_BOOK, M_SET_BOOKS, M_UPDATE_BOOK } from './mutations.type';

const state = {
  books: []
};

const getters = {
  books(state) {
    return state.books;
  }
};

const actions = {

};

const mutations = {
  [M_SET_BOOKS](state, books) {
    state.books = books;
  },
  [M_CREATE_BOOK](state, book) {
    state.books = [...state.books, book];
  },
  [M_UPDATE_BOOK](state, updated) {
    state.books = state.books.map(book => {
      if (book._id === updated._id) return updated;
      return book;
    });
  },
  [M_DELETE_BOOK](state, deleted) {
    state.books = state.books.filter(book => {
      return (book._id !== deleted._id);
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
