import { Item } from '../models/item';

export default {
  async getItems(conn, type) {
    const items = await Item.find({ type });
    conn.send('setItems', { type, items });
    return items;
  },
  async createItem(conn, data) {
    const item = await Item.create(data);
    conn.sendToRoom('createItem', item);
    return item;
  },
  async updateItem(conn, item) {
    await Item.updateOne({ _id: item._id }, item);
    conn.sendToRoom('updateItem', item);
    return item;
  },
  async deleteItem(conn, item) {
    await Item.deleteOne({ _id: item._id });
    conn.sendToRoom('deleteItem', { deleted: item });
    return item;
  },
  async deleteManyItems(conn, { type, ids }) {
    await Item.deleteMany({ type, _id: { $in: ids } });
    conn.sendToRoom('deleteManyItems', { type, ids });
    return { type, ids };
  }
};
