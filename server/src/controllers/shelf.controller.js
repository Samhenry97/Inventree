import { Shelf } from '../models/shelf';

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
  async updateShelf(conn, data) {
    await Shelf.updateOne({ _id: data._id }, data);
    conn.sendToRoom('updateShelf', data);
  },
  async deleteShelf(conn, data) {
    await Shelf.deleteOne({ _id: data._id });
    conn.sendToRoom('deleteShelf', data);
  }
};
