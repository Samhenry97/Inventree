import GoogleBooksAPI from '../utils/google.books.api';

export default {
  async searchBooks(conn, data, callback) {
    const response = await GoogleBooksAPI.search(data);
    const books = GoogleBooksAPI.normalizeBooks(response.data.items);
    callback({ books, totalBooks: response.data.totalItems });
  }
};
