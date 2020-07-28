import { Conversation } from '../models/conversation';

export default {
  async getConversations(conn) {
    const conversations = await Conversation.find({ users: conn.user }).populate('users');
    conn.send('setConversations', conversations);
    for (const conversation of conversations) {
      conn.call('getMessages', conversation._id);
    }
    return conversations;
  },
  async createConversation(conn, data) {
    const conversation = await Conversation.create(data);
    await conversation.populate('users');
    conn.sendToRoom('createConversation', conversation);
    return conversation;
  },
  async updateConversation(conn, conversation) {
    await Conversation.updateOne({ _id: conversation._id }, conversation);
    conn.sendToRoom('updateConversation', conversation);
    return conversation;
  },
  async deleteConversation(conn, conversation) {
    await Conversation.deleteOne({ _id: conversation._id });
    conn.sendToRoom('deleteConversation', conversation);
    return conversation;
  }
};
