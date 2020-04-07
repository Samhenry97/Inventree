import { Tag } from '../models/tag';

export default {
  async getTags(conn, data) {
    const tags = await Tag.find({ user: conn.user._id, type: data.type });
    conn.send('setTags', { type: data.type, tags });
  },
  async createTag(conn, data, finished) {
    data.user = conn.user._id;
    const tag = await Tag.create(data);
    conn.sendToRoom('createTag', tag);
    finished(tag);
  },
  async updateTag(conn, tag) {
    await Tag.updateOne({ _id: tag._id }, tag);
    conn.sendToRoom('updateTag', tag);
  },
  async deleteTag(conn, tag) {
    await Tag.deleteOne({ _id: tag._id });
    conn.sendToRoom('deleteTag', tag);
  }
};
