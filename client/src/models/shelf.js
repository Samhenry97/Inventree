import store from '../store';

export default class Shelf {
  static defaultModel = {
    name: 'Shelf',
    color: '#FFFFFF',
    type: 'book'
  };

  static exists(shelf) {
    for (const otherShelf of store.state.shelves[shelf.type]) {
      if (otherShelf.name.toLowerCase() === shelf.name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  static getById(type, id) {
    for (const shelf of store.state.shelves[type]) {
      if (shelf._id === id) {
        return shelf;
      }
    }
    return null;
  }

  static itemCount(shelf) {
    let count = 0;
    for (const book of store.state.books.book) {
      if (book.shelf === shelf._id) count++;
    }
    return count;
  }

  static allBut(shelf) {
    return store.state.shelves[shelf.type].filter(otherShelf => {
      return otherShelf._id !== shelf._id;
    });
  }
}
