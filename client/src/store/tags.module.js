import Vue from 'vue';
import {
  M_CREATE_TAG,
  M_DELETE_TAG,
  M_SET_TAGS,
  M_UPDATE_TAG
} from './mutations.type';
import { A_CREATE_TAG, A_DELETE_TAG, A_UPDATE_TAG } from './actions.type';
import Socket from '../common/socket';

const state = {

};

const getters = {
  tags: (state, getters) => state[getters.type._id],
  tagById: (state, getters) => id => {
    const type = getters.type;
    const results = state[type._id].filter(tag => tag._id === id);
    return results.length > 0 ? results[0] : null;
  },
  tagFindOne: (state, getters) => query => {
    const results = getters.tagFindMany(query);
    return results.length > 0 ? results[0] : null;
  },
  tagFindMany: (state, getters) => query => {
    const type = getters.type;
    return state[type._id].filter(tag => {
      for (const field in query) {
        if (tag[field] === query[field]) return true;
      }
      return false;
    });
  }
};

const actions = {
  [A_CREATE_TAG](context, data) {
    return Socket.one(this._vm, {
      name: 'createTag',
      data,
      success: 'Successfully created tag!',
      error: 'Error creating tag.'
    });
  },
  [A_UPDATE_TAG](context, data) {
    return Socket.one(this._vm, {
      name: 'updateTag',
      data,
      success: 'Successfully updated tag!',
      error: 'Error updating tag.'
    });
  },
  [A_DELETE_TAG](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteTag',
      data,
      success: 'Successfully deleted tag!',
      error: 'Error deleting tag.'
    });
  }
};

const mutations = {
  [M_SET_TAGS](state, { type, tags }) {
    Vue.set(state, type, tags);
  },
  [M_CREATE_TAG](state, tag) {
    state[tag.type] = [...state[tag.type], tag];
  },
  [M_UPDATE_TAG](state, updated) {
    state[updated.type] = state[updated.type].map(tag => {
      if (tag._id === updated._id) return updated;
      return tag;
    });
  },
  [M_DELETE_TAG](state, deleted) {
    state[deleted.type] = state[deleted.type].filter(tag => {
      return tag._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
