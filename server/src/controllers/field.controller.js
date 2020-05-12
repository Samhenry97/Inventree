import { Field } from '../models/field';

export default {
  async getFields(conn, type) {
    const fields = await Field.find({ type });
    conn.send('setFields', { type, fields });
    return fields;
  },
  async createField(conn, data) {
    const field = await Field.create(data);
    conn.sendToRoom('createField', field);
    return field;
  },
  async updateField(conn, field) {
    await Field.updateOne({ _id: field._id }, field);
    conn.sendToRoom('updateField', field);
    return field;
  },
  async deleteField(conn, field) {
    await Field.deleteOne({ _id: field._id });
    conn.sendToRoom('deleteField', field);
    return field;
  }
};
