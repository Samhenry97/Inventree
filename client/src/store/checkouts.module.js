import Vue from 'vue';
import {
  M_CREATE_CHECKOUT,
  M_DELETE_CHECKOUT,
  M_DELETE_ITEM,
  M_DELETE_MANY_ITEMS,
  M_SET_CHECKOUTS,
  M_UPDATE_CHECKOUT
} from './mutations.type';
import { A_CREATE_CHECKOUT, A_DELETE_CHECKOUT, A_UPDATE_CHECKOUT } from './actions.type';
import Socket from '../common/socket';

function dateOutSort(a, b) {
  if (a.dateIn && b.dateIn) {
    return b.dateIn - a.dateIn;
  } else if(a.dateIn || b.dateIn) {
    return a.dateIn ? 1 : -1;
  } else {
    return b.dateOut - a.dateOut;
  }
}

function normalize(checkout) {
  return {
    ...checkout,
    dateIn: checkout.dateIn ? new Date(checkout.dateIn) : null,
    dateOut: checkout.dateOut ? new Date(checkout.dateOut) : null
  };
}

export const defaultModel = {
  book: null,
  dateIn: null,
  dateOut: null
};

const state = {

};

const getters = {
  checkouts: (state, getters) => {
    return state[getters.type._id].sort(dateOutSort)
  },
  checkoutById: (state, getters) => id => {
    const results = state[getters.type._id].filter(checkout => checkout._id === id);
    return results.length > 0 ? results[0] : null;
  },
  checkoutFindOne: (state, getters) => query => {
    const results = getters.checkoutFindMany(query);
    return results.length > 0 ? results[0] : null;
  },
  checkoutFindMany: (state, getters) => query => {
    return state[getters.type._id].filter(checkout => {
      for (const field in query) {
        if (checkout[field] === query[field]) return true;
      }
      return false;
    });
  },
  checkoutsForItem: (state, getters) => item => {
    if (!item) return [];
    return state[getters.type._id]
        .filter(checkout => checkout.item === item._id)
        .sort(dateOutSort);
  },
  checkoutOutForItem: (state, getters) => item => {
    if (!item) return null;
    const results = state[getters.type._id].filter(checkout => checkout.item === item._id && !checkout.dateIn);
    return results.length > 0 ? results[0] : null;
  }
};

const actions = {
  [A_CREATE_CHECKOUT](context, data) {
    return Socket.one(this._vm, {
      name: 'createCheckout',
      data,
      success: 'Successfully created checkout!',
      error: 'Error creating checkout.'
    });
  },
  [A_UPDATE_CHECKOUT](context, data) {
    return Socket.one(this._vm, {
      name: 'updateCheckout',
      data,
      success: 'Successfully updated checkout!',
      error: 'Error updating checkout.'
    });
  },
  [A_DELETE_CHECKOUT](context, data) {
    return Socket.one(this._vm, {
      name: 'deleteCheckout',
      data,
      success: 'Successfully deleted checkout!',
      error: 'Error deleting checkout.'
    });
  }
};

const mutations = {
  [M_SET_CHECKOUTS](state, { type, checkouts }) {
    Vue.set(state, type, checkouts);
  },
  [M_CREATE_CHECKOUT](state, checkout) {
    state[checkout.type] = [...state[checkout.type], checkout];
  },
  [M_UPDATE_CHECKOUT](state, updated) {
    state[updated.type] = state[updated.type].map(checkout => {
      if (checkout._id === updated._id) return normalize(updated);
      return checkout;
    });
  },
  [M_DELETE_CHECKOUT](state, deleted) {
    state[deleted.type] = state[deleted.type].filter(checkout => {
      return checkout._id !== deleted._id;
    });
  },
  [M_DELETE_ITEM](state, deleted) {
    if (!state[deleted.type]) return;
    state[deleted.type] = state[deleted.type].filter(checkout => {
      return checkout.item !== deleted._id;
    })
  },
  [M_DELETE_MANY_ITEMS](state, { type, ids }) {
    if (!state[type]) return;
    state[type] = state[type].filter(checkout => {
      return !ids.includes(checkout.item);
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
