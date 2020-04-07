import { Shelf } from '../models/shelf';
import { Book } from '../models/book';

export default {
  async getShelves(conn, data) {
    const shelves = await Shelf.find({ user: conn.user._id, type: data.type });
    conn.send('setShelves', { type: data.type, shelves });
  },
  async createShelf(conn, data) {
    data.user = conn.user._id;
    const shelf = await Shelf.create(data);
    conn.sendToRoom('createShelf', shelf);
  },
  async updateShelf(conn, shelf) {
    await Shelf.updateOne({ _id: shelf._id }, shelf);
    conn.sendToRoom('updateShelf', shelf);
  },
  async deleteShelf(conn, shelf, moveShelf) {
    await Shelf.deleteOne({ _id: shelf._id });
    if (moveShelf) {
      await Book.updateMany({ shelf: shelf._id }, { shelf: moveShelf });
      const res = { type: shelf.type, oldShelf: shelf._id, newShelf: moveShelf };
      conn.sendToRoom('moveItems', res);
    }
    conn.sendToRoom('deleteShelf', shelf);
  }
};
