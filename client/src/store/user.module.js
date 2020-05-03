import { M_SET_AUTHED, M_SET_USER } from './mutations.type';
import { A_LOGIN, A_LOGOUT, A_UPDATE_USER } from './actions.type';
import Socket from '../common/socket';

const state = {
  user: {},
  authed: false
};

const getters = {
  user(state) {
    return state.user;
  },
  authed(state) {
    return state.authed;
  }
};

const actions = {
  [A_LOGIN]({ commit }, data) {
    return new Promise((resolve, reject) => {
      Socket.one(this._vm, {
        name: 'login',
        data,
        success: 'Successfully logged in!',
        error: 'Error logging in.'
      }).then(response => {
        commit(M_SET_AUTHED, true);
        resolve(response);
      }).catch(reject);
    });
  },
  [A_LOGOUT](context, data) {
    return Socket.one(this._vm, {
      name: 'logout',
      data,
      success: 'Successfully logged out!',
      error: 'Error logging out.'
    });
  },
  [A_UPDATE_USER](context, data) {
    return Socket.one(this._vm, {
      name: 'updateUser',
      data,
      success: 'Successfully updated user!',
      error: 'Error updating user.'
    });
  }
};

const mutations = {
  [M_SET_USER](state, user) {
    state.user = user;
  },
  [M_SET_AUTHED](state, authed) {
    state.authed = authed;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
