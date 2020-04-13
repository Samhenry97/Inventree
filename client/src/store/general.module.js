import { A_SEARCH_BOOKS } from './actions.type';
import Socket from '../common/socket';

const state = {

};

const getters = {

};

const actions = {
  [A_SEARCH_BOOKS](context, data) {
    return Socket.one(this._vm, {
      name: 'searchBooks',
      data,
      error: 'Error searching for books.'
    });
  }
};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations
}
