import {
    M_SET_CONTAINERS,
    M_CREATE_CONTAINER,
    M_UPDATE_CONTAINER,
    M_DELETE_CONTAINER
} from './mutations.type';
import {
  A_CREATE_CONTAINER,
  A_UPDATE_CONTAINER,
  A_DELETE_CONTAINER, A_FETCH_CONTAINERS
} from './actions.type';
import Socket from '../common/socket';

export const defaultModel = {
  name: '',
  path: '',
  description: ''
};

const state = {
  containers: []
};

const getters = {
  containers: state => state.containers,
  containerById: state => id => {
    const results = state.containers.filter(container => container._id === id);
    return results.length > 0 ? results[0] : null;
  },
  containerFindOne: state => query => {
    const results = getters.containerFindMany(state)(query);
    return results.length > 0 ? results[0] : null;
  },
  containerFindMany: state => query => {
    return state.containers.filter(container => {
      for (const field in query) {
        if (container[field] === query[field]) return true;
      }
      return false;
    });
  }
};

const actions = {
  [A_FETCH_CONTAINERS]() {
    return Socket.one(this._vm, {
      name: 'getContainers',
      error: 'Error getting containers.'
    });
  },
  [A_CREATE_CONTAINER](context, data) {
    return Socket.one(this._vm, {
      name: 'createContainer',
      data,
      success: 'Successfully created container!',
      error: 'Error creating container.'
    });
  },
  [A_UPDATE_CONTAINER](context, data) {
    return Socket.one(this._vm, {
      name: 'updateContainer',
      data,
      success: 'Successfully updated container!',
      error: 'Error updating container.'
    });
  },
  [A_DELETE_CONTAINER](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteContainer',
      data,
      success: 'Successfully deleted container!',
      error: 'Error deleting container.'
    });
  }
};

const mutations = {
  [M_SET_CONTAINERS](state, containers) {
    state.containers = containers;
  },
  [M_CREATE_CONTAINER](state, container) {
    state.containers = [...state.containers, container];
  },
  [M_UPDATE_CONTAINER](state, updated) {
    state.containers = state.containers.map(container => {
      if (container._id === updated._id) return container;
      return container;
    });
  },
  [M_DELETE_CONTAINER](state, deleted) {
    state.containers = state.containers.filter(container => {
      return container._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
