import { Message } from '../models/message';
import { Conversation } from '../models/conversation';

export default {
  async getMessages(conn, conversation) {
    const messages = await Message.find({ conversation });
    conn.send('setMessages', { conversation, messages });
    return messages;
  },
  async createMessage(conn, data) {
    data.user = conn.user;
    const message = await Message.create(data);
    const conversation = await Conversation.findOne({ _id: message.conversation });
    for (const user of conversation.users) {
      conn.sendToUser(user, 'createMessage', message);
    }
    return message;
  },
  async updateMessage(conn, message) {
    await Message.updateOne({ _id: message._id }, message);
    const conversation = await Conversation.findOne({ _id: message.conversation });
    for (const user of conversation.users) {
      conn.sendToUser(user, 'updateMessage', message);
    }
    return message;
  },
  async deleteMessage(conn, message) {
    await Message.deleteOne({ _id: message._id });
    const conversation = await Conversation.findOne({ _id: message.conversation });
    for (const user of conversation.users) {
      conn.sendToUser(user, 'deleteMessage', message);
    }
    return message;
  }
};
