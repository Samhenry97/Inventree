import { A_BOOK_REPORTS, A_SEARCH_BOOKS } from './actions.type';
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
  },
  [A_BOOK_REPORTS](context, data) {
    return Socket.one(this._vm, {
      name: 'bookReports',
      data,
      error: 'Error generating reports.'
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
