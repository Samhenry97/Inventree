import Vue from 'vue';
import {
  M_CREATE_ITEM,
  M_DELETE_ITEM,
  M_DELETE_MANY_ITEMS,
  M_DELETE_SHELF,
  M_DELETE_TAG,
  M_SET_ITEMS,
  M_UPDATE_ITEM,
  M_UPDATE_MANY_ITEMS
} from './mutations.type';
import {
  A_CREATE_ITEM,
  A_DELETE_ITEM,
  A_DELETE_MANY_ITEMS,
  A_FETCH_ITEMS,
  A_UPDATE_ITEM
} from './actions.type';
import Socket from '../common/socket';

export const defaultModel = {
  shelves: [],
  tags: []
};

const state = {
  book: []
};

const getters = {
  items: (state, getters) => state[getters.type._id],
  itemById: (state, getters) => id => {
    const type = getters.type;
    const results = state[type._id].filter(item => item._id === id);
    return results.length > 0 ? results[0] : null;
  },
  itemFindOne: (state, getters) => query => {
    const results = getters.itemFindMany(query);
    return results.length > 0 ? results[0] : null;
  },
  itemFindMany: (state, getters) => query => {
    return state[getters.type._id].filter(item => {
      for (const field in query) {
        if (item[field] === query[field]) return true;
      }
      return false;
    });
  },
  itemsInShelf: state => shelf => {
    if (!shelf) return [];
    return state[shelf.type].filter(item => {
      return item.shelves.includes(shelf._id);
    });
  }
};

const actions = {
  [A_FETCH_ITEMS](context, type) {
    const commands = [
      { name: 'getItems', data: type },
      { name: 'getShelves', data: type },
      { name: 'getTags', data: type },
      { name: 'getCheckouts', data: type },
      { name: 'getFields', data: type }
    ];
    return Socket.all(this._vm, commands);
  },
  [A_CREATE_ITEM](context, data) {
    return Socket.one(this._vm, {
      name: 'createItem',
      data,
      success: 'Successfully created item!',
      error: 'Error saving item.'
    });
  },
  [A_DELETE_ITEM](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteItem',
      data,
      success: 'Successfully deleted item!',
      error: 'Error deleting item.'
    });
  },
  [A_UPDATE_ITEM](context, data) {
    return Socket.one(this._vm, {
      name: 'updateItem',
      data,
      success: 'Successfully updated item!',
      error: 'Error updating item.'
    });
  },
  [A_DELETE_MANY_ITEMS](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteManyItems',
      data,
      success: 'Successfully deleted items!',
      error: 'Error deleting items.'
    });
  }
};

const mutations = {
  [M_SET_ITEMS](state, { type, items }) {
    Vue.set(state, type, items);
  },
  [M_CREATE_ITEM](state, created) {
    state[created.type] = [...state[created.type], created];
  },
  [M_UPDATE_ITEM](state, updated) {
    state[updated.type] = state[updated.type].map(item => {
      if (item._id === updated._id) return updated;
      return item;
    });
  },
  [M_DELETE_ITEM](state, deleted) {
    state[deleted.type] = state[deleted.type].filter(item => {
      return (item._id !== deleted._id);
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
  },
  [M_DELETE_SHELF](state, deleted) {
    state[deleted.type] = state[deleted.type].map(item => {
      if (item.shelves.includes(deleted._id)) {
        return { ...item, shelves: item.shelves.filter(shelf => shelf !== deleted._id) };
      }
      return item;
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
