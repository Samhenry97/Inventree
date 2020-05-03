import { Shelf } from '../models/shelf';

export default {
  async getShelves(conn, type) {
    const shelves = await Shelf.find({ type });
    conn.send('setShelves', { type, shelves });
    return shelves;
  },
  async createShelf(conn, data) {
    const shelf = await Shelf.create(data);
    conn.sendToRoom('createShelf', shelf);
    return shelf;
  },
  async updateShelf(conn, shelf) {
    await Shelf.updateOne({ _id: shelf._id }, shelf);
    conn.sendToRoom('updateShelf', shelf);
    return shelf;
  },
  async deleteShelf(conn, shelf) {
    await Shelf.deleteOne({ _id: shelf._id });
    conn.sendToRoom('deleteShelf', shelf);
    return shelf;
  }
};
