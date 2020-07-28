import {
  M_SET_CONVERSATIONS,
  M_CREATE_CONVERSATION,
  M_UPDATE_CONVERSATION,
  M_DELETE_CONVERSATION
} from './mutations.type';
import {
  A_FETCH_CONVERSATIONS,
  A_CREATE_CONVERSATION,
  A_UPDATE_CONVERSATION,
  A_DELETE_CONVERSATION
} from './actions.type';
import Socket from '../common/socket';

export function defaultModel() {
  return {
    name: '',
    users: []
  };
}

const state = {
  conversations: []
};

const getters = {
  conversations: state => state.conversations,
  conversationById: state => id => {
    const results = state.conversations.filter(conversation => conversation._id === id);
    return results.length > 0 ? results[0] : null;
  },
  conversationFindOne: (state, getters) => query => {
    const results = getters.conversationFindMany(query);
    return results.length > 0 ? results[0] : null;
  },
  conversationFindMany: state => query => {
    return state.conversations.filter(conversations => {
      for (const field in query) {
        if (conversations[field] === query[field]) return true;
      }
      return false;
    });
  },
  conversationName: (state, getters) => conversation => {
    if (conversation.name) return conversation.name;
    return conversation.users
        .filter(user => user._id !== getters.user._id)
        .map(user => user.name)
        .join(', ');
  }
};

const actions = {
  [A_FETCH_CONVERSATIONS]() {
    return Socket.one(this._vm, {
      name: 'getConversations',
      error: 'Error getting conversations.'
    });
  },
  [A_CREATE_CONVERSATION](context, data) {
    return Socket.one(this._vm, {
      name: 'createConversation',
      data,
      success: 'Successfully created conversation!',
      error: 'Error creating conversation.'
    });
  },
  [A_UPDATE_CONVERSATION](context, data) {
    return Socket.one(this._vm, {
      name: 'updateConversation',
      data,
      success: 'Successfully updated conversation!',
      error: 'Error updating conversation.'
    });
  },
  [A_DELETE_CONVERSATION](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteConversation',
      data,
      success: 'Successfully deleted conversation!',
      error: 'Error deleting conversation.'
    });
  }
};

const mutations = {
  [M_SET_CONVERSATIONS](state, conversations) {
    state.conversations = conversations;
  },
  [M_CREATE_CONVERSATION](state, conversation) {
    state.conversations = [...state.conversations, conversation];
  },
  [M_UPDATE_CONVERSATION](state, updated) {
    state.conversations = state.conversations.map(conversation => {
      if (conversation._id === updated._id) return conversation;
      return conversation;
    });
  },
  [M_DELETE_CONVERSATION](state, deleted) {
    state.conversations = state.conversations.filter(conversation => {
      return conversation._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
