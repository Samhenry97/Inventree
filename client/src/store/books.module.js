import { M_CREATE_BOOK, M_DELETE_BOOK, M_MOVE_ITEMS, M_SET_BOOKS, M_UPDATE_BOOK } from './mutations.type';

const state = {
  book: []
};

const getters = {
  books(state) {
    return state.book;
  }
};

const actions = {

};

const mutations = {
  [M_SET_BOOKS](state, books) {
    state.book = books;
  },
  [M_CREATE_BOOK](state, book) {
    state.book = [...state.book, book];
  },
  [M_UPDATE_BOOK](state, updated) {
    state.book = state.book.map(book => {
      if (book._id === updated._id) return updated;
      return book;
    });
  },
  [M_DELETE_BOOK](state, deleted) {
    state.book = state.book.filter(book => {
      return (book._id !== deleted._id);
    });
  },
  [M_MOVE_ITEMS](state, { type, oldShelf, newShelf }) {
    state[type] = state[type].map(book => {
      if (book.shelf === oldShelf) {
        return { ...book, shelf: newShelf };
      }
      return book;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
