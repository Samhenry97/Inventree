import { Type } from '../models/type';

export default {
  async getTypes(conn, container) {
    const types = await Type.find({ container });
    conn.send('setTypes', { container, types });
    return types;
  },
  async createType(conn, data) {
    const type = await Type.create(data);
    conn.sendToRoom('createType', type);
    return type;
  },
  async updateType(conn, type) {
    await Type.updateOne({ _id: type._id }, type);
    conn.sendToRoom('updateType', type);
    return type;
  },
  async deleteType(conn, type) {
    await Type.deleteOne({ _id: type._id });
    conn.sendToRoom('deleteType', type);
    return type;
  }
};
