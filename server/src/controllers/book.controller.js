import { Book } from '../models/book';

export default {
  async getItems(conn, { type }) {
    let items;
    if (type === 'book') {
      items = await Book.find({ user: conn.user._id });
    }
    conn.send('setItems', { type, items });
    return items;
  },
  async deleteItem(conn, { type, item }) {
    if (type === 'book') {
      await Book.deleteOne({ _id: item._id });
    }
    conn.sendToRoom('deleteItem', { type, deleted: item });
    return item;
  },
  async updateItem(conn, { type, item }) {
    if (type === 'book') {
      await Book.updateOne({ _id: item._id }, item);
    }
    conn.sendToRoom('updateItem', { type, updated: item });
    return item;
  },
  async createItem(conn, { type, item }) {
    item.user = conn.user._id;
    let created;
    if (type === 'book') {
      created = await Book.create(item);
      if (created.from === 'inventree') {
        created.fromid = created._id;
        await created.save();
      }
    }
    conn.sendToRoom('createItem', { type, created });
    return created;
  },
  async deleteManyItems(conn, { type, ids }) {
    if (type === 'book') {
      await Book.deleteMany({ _id: { $in: ids }});
    }
    conn.sendToRoom('deleteManyItems', { type, ids });
    return ids;
  }
};
