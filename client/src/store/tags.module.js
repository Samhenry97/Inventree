import {
  M_CREATE_TAG,
  M_DELETE_TAG,
  M_SET_TAGS,
  M_UPDATE_TAG
} from './mutations.type';

const state = {
  book: []
};

const getters = {

};

const actions = {

};

const mutations = {
  [M_SET_TAGS](state, { type, tags }) {
    state[type] = tags;
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
