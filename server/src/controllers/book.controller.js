import { Book } from '../models/book';

export default {
  async getBooks(conn) {
    const books = await Book.find({ user: conn.user._id });
    conn.send('setBooks', books);
  },
  async deleteBook(conn, book) {
    await Book.findByIdAndDelete(book._id);
    conn.sendToRoom('deleteBook', book);
  },
  async updateBook(conn, book) {
    await Book.findByIdAndUpdate(book._id, book);
    conn.sendToRoom('updateBook', book);
  },
  async createBook(conn, data) {
    data.user = conn.user._id;
    const book = await Book.create(data);
    if (book.from === 'inventree') {
      book.fromid = book._id;
      await book.save();
    }
    conn.sendToRoom('createBook', book);
  }
};
