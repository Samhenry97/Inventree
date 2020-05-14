import { A_ITEM_REPORTS, A_SEARCH_BOOKS } from './actions.type';
import Socket from '../common/socket';
import { M_SET_SELECTED_CONTAINER, M_SET_SELECTED_TYPE, M_TOGGLE_DRAWER } from './mutations.type';

const state = {
  container: null,
  type: null,
  drawer: null
};

const getters = {
  container: (state, getters) => getters.containerById(state.container),
  type: (state, getters) => getters.typeById(getters.container._id, state.type),
  drawer: state => state.drawer
};

const actions = {
  [A_SEARCH_BOOKS](context, data) {
    return Socket.one(this._vm, {
      name: 'searchBooks',
      data,
      error: 'Error searching for books.'
    });
  },
  [A_ITEM_REPORTS](context, data) {
    return Socket.one(this._vm, {
      name: 'itemReports',
      data,
      error: 'Error generating reports.'
    });
  }
};

const mutations = {
  [M_SET_SELECTED_CONTAINER](state, container) {
    state.container = container;
  },
  [M_SET_SELECTED_TYPE](state, type) {
    state.type = type;
  },
  [M_TOGGLE_DRAWER](state, value) {
    if (typeof value === 'boolean') {
      state.drawer = value;
    } else {
      state.drawer = !state.drawer;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
