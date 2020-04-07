import { Book } from '../models/book';

export default {
  async getBooks(conn) {
    const books = await Book.find({ user: conn.user._id });
    conn.send('setItems', { type: 'book', items: books });
  },
  async deleteBook(conn, book) {
    await Book.deleteOne({ _id: book._id });
    conn.sendToRoom('deleteItem', { type: 'book', deleted: book });
  },
  async updateBook(conn, book) {
    await Book.updateOne({ _id: book._id }, book);
    const updated = await Book.findById(book._id);
    conn.sendToRoom('updateItem', { type: 'book', updated });
  },
  async createBook(conn, data) {
    data.user = conn.user._id;
    const book = await Book.create(data);
    if (book.from === 'inventree') {
      book.fromid = book._id;
      await book.save();
    }
    conn.sendToRoom('createItem', { type: 'book', created: book });
  },
  async deleteManyBooks(conn, ids, finished) {
    await Book.deleteMany({ _id: { $in: ids }});
    conn.sendToRoom('deleteManyItems', { type: 'book', ids });
    finished();
  },
  async updateManyBooks(conn, ids, update, finished) {
    await Book.updateMany({ _id: { $in: ids }}, update);
    const books = await Book.find({ _id: { $in: ids }});
    conn.sendToRoom('updateManyItems', { type: 'book', items: books });
    finished();
  }
};
