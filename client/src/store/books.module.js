import {
  M_CREATE_ITEM,
  M_DELETE_ITEM,
  M_DELETE_MANY_ITEMS,
  M_DELETE_SHELF,
  M_DELETE_TAG,
  M_SET_ITEMS,
  M_UPDATE_ITEM,
  M_UPDATE_MANY_ITEMS
} from './mutations.type';

export const defaultModel = {
  shelves: [],
  tags: [],
  title: 'Book',
  subtitle: '',
  publisher: '',
  published: '',
  pageCount: null,
  printType: 'paper',
  maturityRating: '',
  thumbnail: 'https://www.aamindus.com/images/notfound.png',
  smallThumbnail: 'https://www.aamindus.com/images/notfound.png',
  language: 'en',
  author: '',
  from: 'inventree',
  fromid: '',
  isbn10: '',
  isbn13: '',
  description: '',
  rating: null
};

const state = {
  book: []
};

const getters = {
  books: state => state.book,
  itemById: state => (type, id) => {
    const results = state[type].filter(item => item._id === id);
    return results.length > 0 ? results[0] : null;
  },
  itemFindOne: state => (type, query) => {
    const results = getters.itemFindMany(state)(type, query);
    return results.length > 0 ? results[0] : null;
  },
  itemFindMany: state => (type, query) => {
    return state[type].filter(item => {
      for (const field in query) {
        if (item[field] === query[field]) return true;
      }
      return false;
    });
  },
  itemsInShelf: state => shelf => {
    if (!shelf) return [];
    return state[shelf.type].filter(item => {
      return item.shelves.includes(shelf._id);
    });
  }
};

const actions = {

};

const mutations = {
  [M_SET_ITEMS](state, { type, items }) {
    state[type] = items;
  },
  [M_CREATE_ITEM](state, { type, created }) {
    state[type] = [...state[type], created];
  },
  [M_UPDATE_ITEM](state, { type, updated }) {
    state[type] = state[type].map(item => {
      if (item._id === updated._id) return updated;
      return item;
    });
  },
  [M_DELETE_ITEM](state, { type, deleted }) {
    state[type] = state[type].filter(item => {
      return (item._id !== deleted._id);
    });
  },
  [M_DELETE_MANY_ITEMS](state, { type, ids }) {
    state[type] = state[type].filter(item => !ids.includes(item._id));
  },
  [M_UPDATE_MANY_ITEMS](state, { type, items }) {
    state[type] = state[type].map(item => {
      for (const otherItem of items) {
        if (otherItem._id === item._id) return otherItem;
      }
      return item;
    });
  },
  [M_DELETE_TAG](state, deleted) {
    state[deleted.type] = state[deleted.type].map(item => {
      if (item.tags.includes(deleted._id)) {
        return { ...item, tags: item.tags.filter(tag => tag !== deleted._id) };
      }
      return item;
    });
  },
  [M_DELETE_SHELF](state, deleted) {
    state[deleted.type] = state[deleted.type].map(item => {
      if (item.shelves.includes(deleted._id)) {
        return { ...item, shelves: item.shelves.filter(shelf => shelf !== deleted._id) };
      }
      return item;
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
