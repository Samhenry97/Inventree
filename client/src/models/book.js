import store from '../store';

export default class Book {
  static defaultModel = {
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

  static exists(book) {
    for (const otherBook of store.state.books.book) {
      if (otherBook.isbn10 === book.isbn10 || otherBook.isbn13 === book.isbn13) {
        return true;
      }
    }
    return false;
  }

  static getByISBN(book) {
    for (const otherBook of store.state.books.book) {
      if (otherBook.isbn10 === book.isbn10 || otherBook.isbn13 === book.isbn13) {
        return otherBook;
      }
    }
    return null;
  }
}
