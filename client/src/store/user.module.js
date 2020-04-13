import { M_SET_USER } from './mutations.type';
import { A_LOGIN, A_LOGOUT, A_UPDATE_USER } from './actions.type';
import Socket from '../common/socket';

const state = {
  user: {}
};

const getters = {
  user(state) {
    return state.user;
  },
  authed(state) {
    return !!state.user._id;
  }
};

const actions = {
  [A_LOGIN](context, data) {
    return Socket.one(this._vm, {
      name: 'login',
      data,
      success: 'Successfully logged in!',
      error: 'Error logging in.'
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
