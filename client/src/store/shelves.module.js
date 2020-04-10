import {
  M_CREATE_SHELF,
  M_DELETE_SHELF,
  M_SET_SHELVES,
  M_UPDATE_SHELF
} from './mutations.type';

export const defaultModel = {
  name: '',
  color: '#FFFFFF',
  type: 'book'
};

const state = {
  book: []
};

const getters = {
  shelfById: state => (type, id) => {
    const results = state[type].filter(shelf => shelf._id === id);
    return results.length > 0 ? results[0] : null;
  },
  shelfFindOne: state => (type, query) => {
    const results = getters.shelfFindMany(state)(type, query);
    return results.length > 0 ? results[0] : null;
  },
  shelfFindMany: state => (type, query) => {
    return state[type].filter(shelf => {
      for (const field in query) {
        if (shelf[field] === query[field]) return true;
      }
      return false;
    });
  }
};

const actions = {

};

const mutations = {
  [M_SET_SHELVES](state, { type, shelves }) {
    state[type] = shelves;
  },
  [M_CREATE_SHELF](state, shelf) {
    state[shelf.type] = [...state[shelf.type], shelf];
  },
  [M_UPDATE_SHELF](state, updated) {
    state[updated.type] = state[updated.type].map(shelf => {
      if (shelf._id === updated._id) return updated;
      return shelf;
    });
  },
  [M_DELETE_SHELF](state, deleted) {
    state[deleted.type] = state[deleted.type].filter(shelf => {
      return shelf._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
