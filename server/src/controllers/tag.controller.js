import { Tag } from '../models/tag';

export default {
  async getTags(conn, type) {
    const tags = await Tag.find({ type });
    conn.send('setTags', { type, tags });
    return tags;
  },
  async createTag(conn, data) {
    data.user = conn.user;
    const tag = await Tag.create(data);
    conn.sendToRoom('createTag', tag);
    return tag;
  },
  async updateTag(conn, tag) {
    await Tag.updateOne({ _id: tag._id }, tag);
    conn.sendToRoom('updateTag', tag);
    return tag;
  },
  async deleteTag(conn, tag) {
    await Tag.deleteOne({ _id: tag._id });
    conn.sendToRoom('deleteTag', tag);
    return tag;
  }
};
