import {
  M_CREATE_CHECKOUT,
  M_DELETE_CHECKOUT,
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

const state = {
  checkouts: []
};

const getters = {
  checkouts: state => {
    return state.checkouts.sort(dateOutSort)
  },
  checkoutsForBook: state => book => {
    if (!book) return [];
    return state.checkouts
        .filter(checkout => checkout.book === book._id)
        .sort(dateOutSort);
  }
};

const actions = {

};

const mutations = {
  [M_SET_CHECKOUTS](state, checkouts) {
    state.checkouts = checkouts;
  },
  [M_CREATE_CHECKOUT](state, checkout) {
    state.checkouts = [...state.checkouts, checkout];
  },
  [M_UPDATE_CHECKOUT](state, updated) {
    state.checkouts = state.checkouts.map(checkout => {
      if (checkout._id === updated._id) return updated;
      return checkout;
    });
  },
  [M_DELETE_CHECKOUT](state, deleted) {
    state.checkouts = state.checkouts.filter(checkout => {
      return checkout._id !== deleted._id;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
