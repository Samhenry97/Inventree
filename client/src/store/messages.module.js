import Vue from 'vue';
import {
  M_SET_MESSAGES,
  M_CREATE_MESSAGE,
  M_UPDATE_MESSAGE,
  M_DELETE_MESSAGE, M_CREATE_CONVERSATION
} from './mutations.type';
import {
  A_FETCH_MESSAGES,
  A_CREATE_MESSAGE,
  A_UPDATE_MESSAGE,
  A_DELETE_MESSAGE
} from './actions.type';
import Socket from '../common/socket';

export function defaultModel() {
  return {
    type: 'text',
    content: ''
  };
}

const state = {

};

const getters = {
  messagesByConversation: state => conversation => state[conversation],
  messageById: state => (conversation, id) => {
    const results = state[conversation].filter(message => message._id === id);
    return results.length > 0 ? results[0] : null;
  },
  messageFindOne: (state, getters) => (conversation, query) => {
    const results = getters.messageFindMany(query);
    return results.length > 0 ? results[0] : null;
  },
  messageFindMany: state => (conversation, query) => {
    return state[conversation].filter(message => {
      for (const field in query) {
        if (message[field] === query[field]) return true;
      }
      return false;
    });
  }
};

const actions = {
  [A_FETCH_MESSAGES](context, data) {
    return Socket.one(this._vm, {
      name: 'getMessages',
      data,
      error: 'Error getting messages.'
    });
  },
  [A_CREATE_MESSAGE](context, data) {
    return Socket.one(this._vm, {
      name: 'createMessage',
      data,
      success: 'Successfully sent message!',
      error: 'Error sending message.'
    });
  },
  [A_UPDATE_MESSAGE](context, data) {
    return Socket.one(this._vm, {
      name: 'updateMessage',
      data,
      success: 'Successfully updated message!',
      error: 'Error updating message.'
    });
  },
  [A_DELETE_MESSAGE](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteMessage',
      data,
      success: 'Successfully deleted message!',
      error: 'Error deleting message.'
    });
  }
};

const mutations = {
  [M_SET_MESSAGES](state, { conversation, messages }) {
    Vue.set(state, conversation, messages);
  },
  [M_CREATE_MESSAGE](state, message) {
    state[message.conversation] = [...state[message.conversation], message];
  },
  [M_UPDATE_MESSAGE](state, updated) {
    state[updated.conversation] = state[updated.conversation].map(message => {
      if (message._id === updated._id) return updated;
      return message;
    });
  },
  [M_DELETE_MESSAGE](state, deleted) {
    state[deleted.conversation] = state[deleted.conversation].filter(message => {
      return message._id !== deleted._id;
    });
  },
  [M_CREATE_CONVERSATION](state, conversation) {
    Vue.set(state, conversation._id, []);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
