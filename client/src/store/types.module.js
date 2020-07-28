import Vue from 'vue';
import {
  M_SET_TYPES,
  M_CREATE_TYPE,
  M_UPDATE_TYPE,
  M_DELETE_TYPE
} from './mutations.type';
import {
  A_CREATE_TYPE,
  A_UPDATE_TYPE,
  A_DELETE_TYPE,
  A_FETCH_TYPES
} from './actions.type';
import Socket from '../common/socket';

export const defaultModel = {
  name: '',
  description: ''
};

const state = {

};

const getters = {
  typeByContainer: state => container => state[container],
  typeById: state => (container, id) => {
    const results = state[container].filter(type => type._id === id);
    return results.length > 0 ? results[0] : null;
  },
  typeFindOne: (state, getters) => (container, query) => {
    const results = getters.typeFindMany(container, query);
    return results.length > 0 ? results[0] : null;
  },
  typeFindMany: state => (container, query) => {
    return state[container].filter(type => {
      for (const field in query) {
        if (type[field] === query[field]) return true;
      }
      return false;
    });
  }
};

const actions = {
  [A_FETCH_TYPES](context, data) {
    return Socket.one(this._vm, {
      name: 'getTypes',
      data,
      error: 'Error loading types.'
    });
  },
  [A_CREATE_TYPE](context, data) {
    return Socket.one(this._vm, {
      name: 'createType',
      data,
      success: 'Successfully created type!',
      error: 'Error creating type.'
    });
  },
  [A_UPDATE_TYPE](context, data) {
    return Socket.one(this._vm, {
      name: 'updateType',
      data,
      success: 'Successfully updated type!',
      error: 'Error updating type.'
    });
  },
  [A_DELETE_TYPE](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteType',
      data,
      success: 'Successfully deleted type!',
      error: 'Error deleting type.'
    });
  }
};

const mutations = {
  [M_SET_TYPES](state, { container, types }) {
    Vue.set(state, container, types);
  },
  [M_CREATE_TYPE](state, created) {
    state[created.container] = [...state[created.container], created];
  },
  [M_UPDATE_TYPE](state, updated) {
    state[updated.container] = state[updated.container].map(type => {
      if (type._id === updated._id) return updated;
      return type;
    });
  },
  [M_DELETE_TYPE](state, deleted) {
    state[deleted.container] = state[deleted.container].filter(type => {
      return type._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
