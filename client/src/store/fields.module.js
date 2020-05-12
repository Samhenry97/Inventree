import Vue from 'vue';
import {
  M_CREATE_FIELD,
  M_DELETE_FIELD,
  M_SET_FIELDS,
  M_UPDATE_FIELD,
} from './mutations.type';
import {
  A_CREATE_FIELD,
  A_DELETE_FIELD,
  A_UPDATE_FIELD,
} from './actions.type';
import Socket from '../common/socket';

export function defaultModel() {
  return {
    name: '',
    path: '',
    preset: 'text',
    options: {
      cardDisplay: 'none',
      choices: []
    }
  };
}

export const PRESETS = [
  { name: 'Text', icon: 'text-short', value: 'text' },
  { name: 'Long Text', icon: 'text-subject', value: 'text-long' },
  { name: 'Select One', icon: 'arrow-down-drop-circle', value: 'select' },
  { name: 'Select Multiple', icon: 'form-dropdown', value: 'select-multi' },
  { name: 'Checkbox', icon: 'checkbox-marked', value: 'checkbox' },
  { name: 'Date', icon: 'calendar', value: 'date' },
  { name: 'Phone Number', icon: 'phone', value: 'phone' },
  { name: 'Email', icon: 'email', value: 'email' },
  { name: 'URL', icon: 'link', value: 'url' },
  { name: 'Rating', icon: 'star', value: 'rating' },
  { name: 'Created Time', icon: 'folder-plus', value: 'created' },
  { name: 'Updated Time', icon: 'update', value: 'updated' },
  { name: 'Photo', icon: 'camera', value: 'photo' }
];

const state = {

};

const getters = {
  fields: (state, getters) => state[getters.type._id],
  fieldById: (state, getters) => id => {
    const type = getters.type;
    const results = state[type._id].filter(field => field._id === id);
    return results.length > 0 ? results[0] : null;
  },
  fieldFindOne: (state, getters) => query => {
    const results = getters.fieldFindMany(query);
    return results.length > 0 ? results[0] : null;
  },
  fieldFindMany: (state, getters) => query => {
    return state[getters.type._id].filter(shelf => {
      for (const field in query) {
        if (shelf[field] === query[field]) return true;
      }
      return false;
    });
  }
};

const actions = {
  [A_CREATE_FIELD](context, data) {
    return Socket.one(this._vm, {
      name: 'createField',
      data,
      success: 'Successfully created field!',
      error: 'Error creating field.'
    });
  },
  [A_UPDATE_FIELD](context, data) {
    return Socket.one(this._vm, {
      name: 'updateField',
      data,
      success: 'Successfully updated field!',
      error: 'Error updating field.'
    });
  },
  [A_DELETE_FIELD](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteField',
      data,
      success: 'Successfully deleted field!',
      error: 'Error deleting field.'
    });
  }
};

const mutations = {
  [M_SET_FIELDS](state, { type, fields }) {
    Vue.set(state, type, fields);
  },
  [M_CREATE_FIELD](state, field) {
    state[field.type] = [...state[field.type], field];
  },
  [M_UPDATE_FIELD](state, updated) {
    state[updated.type] = state[updated.type].map(field => {
      if (field._id === updated._id) return updated;
      return field;
    });
  },
  [M_DELETE_FIELD](state, deleted) {
    state[deleted.type] = state[deleted.type].filter(field => {
      return field._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
