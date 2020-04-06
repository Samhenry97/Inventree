import { Book } from '../models/book';

export default {
  async getBooks(conn) {
    const books = await Book.find({ user: conn.user._id });
    conn.send('setBooks', books);
  },
  async deleteBook(conn, data) {
    await Book.deleteOne({ _id: data._id });
    conn.sendToRoom('deleteBook', data);
  },
  async updateBook(conn, data) {
    await Book.updateOne({ _id: data._id }, data);
    conn.sendToRoom('updateBook', data);
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
