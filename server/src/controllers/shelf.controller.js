import { Shelf } from '../models/shelf';

export default {
  async getShelves(conn, data) {
    const shelves = await Shelf.find({ user: conn.user._id, type: data.type });
    conn.send('setShelves', { type: data.type, shelves });
    return shelves;
  },
  async createShelf(conn, data) {
    data.user = conn.user._id;
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
