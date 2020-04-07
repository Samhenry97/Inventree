import {
  M_CREATE_ITEM,
  M_DELETE_ITEM,
  M_DELETE_MANY_ITEMS, M_DELETE_TAG,
  M_MOVE_ITEMS,
  M_SET_ITEMS,
  M_UPDATE_ITEM,
  M_UPDATE_MANY_ITEMS
} from './mutations.type';

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
  [M_SET_ITEMS](state, { type, items }) {
    state[type] = items;
  },
  [M_CREATE_ITEM](state, { type, created }) {
    state[type] = [...state[type], created];
  },
  [M_UPDATE_ITEM](state, { type, updated }) {
    state[type] = state[type].map(item => {
      if (item._id === updated._id) return updated;
      return item;
    });
  },
  [M_DELETE_ITEM](state, { type, deleted }) {
    state[type] = state[type].filter(item => {
      return (item._id !== deleted._id);
    });
  },
  [M_MOVE_ITEMS](state, { type, oldShelf, newShelf }) {
    state[type] = state[type].map(item => {
      if (item.shelf === oldShelf) {
        return { ...item, shelf: newShelf };
      }
      return item;
    });
  },
  [M_DELETE_MANY_ITEMS](state, { type, ids }) {
    state[type] = state[type].filter(item => !ids.includes(item._id));
  },
  [M_UPDATE_MANY_ITEMS](state, { type, items }) {
    state[type] = state[type].map(item => {
      for (const otherItem of items) {
        if (otherItem._id === item._id) return otherItem;
      }
      return item;
    });
  },
  [M_DELETE_TAG](state, deleted) {
    state[deleted.type] = state[deleted.type].map(item => {
      if (item.tags.includes(deleted._id)) {
        return { ...item, tags: item.tags.filter(tag => tag !== deleted._id) };
      }
      return item;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
