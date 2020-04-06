import { M_SET_USER } from './mutations.type';

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
