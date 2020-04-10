import {
  M_CREATE_CHECKOUT,
  M_DELETE_CHECKOUT, M_DELETE_ITEM,
  M_SET_CHECKOUTS,
  M_UPDATE_CHECKOUT
} from './mutations.type';

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
  checkouts: []
};

const getters = {
  checkouts: state => {
    return state.checkouts.sort(dateOutSort)
  },
  checkoutById: state => id => {
    const results = state.checkouts.filter(checkout => checkout._id === id);
    return results.length > 0 ? results[0] : null;
  },
  checkoutFindOne: state => query => {
    const results = getters.checkoutFindMany(state)(query);
    return results.length > 0 ? results[0] : null;
  },
  checkoutFindMany: state => query => {
    return state.checkouts.filter(checkout => {
      for (const field in query) {
        if (checkout[field] === query[field]) return true;
      }
      return false;
    });
  },
  checkoutsForBook: state => book => {
    if (!book) return [];
    return state.checkouts
        .filter(checkout => checkout.book === book._id)
        .sort(dateOutSort);
  },
  checkoutOutForBook: state => book => {
    if (!book) return null;
    const results = state.checkouts.filter(checkout => checkout.book === book._id && !checkout.dateIn);
    return results.length > 0 ? results[0] : null;
  }
};

const actions = {

};

const mutations = {
  [M_SET_CHECKOUTS](state, checkouts) {
    state.checkouts = checkouts;
  },
  [M_CREATE_CHECKOUT](state, checkout) {
    state.checkouts = [...state.checkouts, normalize(checkout)];
  },
  [M_UPDATE_CHECKOUT](state, updated) {
    state.checkouts = state.checkouts.map(checkout => {
      if (checkout._id === updated._id) return normalize(updated);
      return checkout;
    });
  },
  [M_DELETE_CHECKOUT](state, deleted) {
    state.checkouts = state.checkouts.filter(checkout => {
      return checkout._id !== deleted._id;
    });
  },
  [M_DELETE_ITEM](state, { type, deleted }) {
    if (type !== 'book') return;
    state.checkouts = state.checkouts.filter(checkout => {
      return checkout.book !== deleted._id;
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
