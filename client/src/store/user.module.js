import { M_ADD_FRIEND, M_DELETE_FRIEND, M_SET_AUTHED, M_SET_LOADING, M_SET_USER, M_SET_USERS } from './mutations.type';
import {
  A_ADD_FRIEND,
  A_DELETE_FRIEND,
  A_FETCH_USER,
  A_LOGIN,
  A_LOGOUT,
  A_RECONNECT,
  A_SEARCH_USERS,
  A_UPDATE_USER
} from './actions.type';
import Socket from '../common/socket';

const state = {
  user: {},
  authed: false,
  loading: true
};

const getters = {
  user: state => state.user,
  authed: state => state.authed,
  loading: state => state.loading
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
        commit(M_SET_LOADING, false);
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
  [A_RECONNECT](context, data) {
    return Socket.one(this._vm, {
      name: 'loginRefresh',
      data,
      error: 'Error reconnecting.'
    });
  },
  [A_UPDATE_USER](context, data) {
    return Socket.one(this._vm, {
      name: 'updateUser',
      data,
      success: 'Successfully updated user!',
      error: 'Error updating user.'
    });
  },
  [A_SEARCH_USERS](context, data) {
    return Socket.one(this._vm, {
      name: 'searchUsers',
      data,
      error: 'Error searching users.'
    });
  },
  [A_FETCH_USER](context, data) {
    return Socket.one(this._vm, {
      name: 'getUser',
      data,
      error: 'Error fetching user.'
    });
  },
  [A_ADD_FRIEND](context, data) {
    return Socket.one(this._vm, {
      name: 'addFriend',
      data,
      success: 'Successfully added friend!',
      error: 'Error adding friend.'
    });
  },
  [A_DELETE_FRIEND](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteFriend',
      data,
      success: 'Successfully removed friend.',
      error: 'Error removing friend.'
    });
  }
};

const mutations = {
  [M_SET_USER](state, user) {
    state.user = user;
  },
  [M_SET_AUTHED](state, authed) {
    state.authed = authed;
  },
  [M_SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [M_ADD_FRIEND](state, friend) {
    state.user = {
      ...state.user,
      friends: [...state.user.friends, friend]
    };
  },
  [M_DELETE_FRIEND](state, deleted) {
    state.user = {
      ...state.user,
      friends: state.user.friends.filter(friend => friend !== deleted)
    };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
