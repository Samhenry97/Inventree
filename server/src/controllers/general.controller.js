import GoogleBooksAPI from '../utils/google.books.api';

export default {
  async searchBooks(conn, data) {
    const response = await GoogleBooksAPI.search(data);
    const books = GoogleBooksAPI.normalizeBooks(response.data.items);
    return { books, totalBooks: response.data.totalItems };
  }
};
