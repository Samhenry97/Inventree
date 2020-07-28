import { User } from '../models/user';

export default {
  async login(conn, data) {
    let user = await User.findOne({ sub: data.sub });
    if (!user) user = await User.create(data);
    conn.login(user);
    conn.send('setUser', user);
    await conn.call('getContainers');
    return user;
  },
  async loginRefresh(conn, data) {
    const user = await User.findOne({ sub: data.sub });
    conn.login(user);
    return user;
  },
  async logout(conn) {
    conn.logout();
  },
  async updateUser(conn, user) {
    await User.updateOne({ _id: user._id }, user);
    conn.sendToRoom('setUser', user);
    return user;
  },
  async searchUsers(conn, query) {
    const regex = new RegExp(query, 'i');
    const or = [
      { name: { $regex: regex } },
      { nickname: { $regex: regex } },
      { email: { $regex: regex } }
    ];
    const users =  await User.find({ $or: or });
    return users.filter(user => user._id.toString() !== conn.user.toString());
  },
  async getUser(conn, user) {
    return await User.findById(user);
  },
  async addFriend(conn, friend) {
    await User.updateOne({ _id: conn.user }, { $addToSet: { friends: friend } });
    conn.sendToRoom('addFriend', friend);
    return friend;
  },
  async deleteFriend(conn, friend) {
    await User.updateOne({ _id: conn.user }, { $pull: { friends: friend } });
    conn.sendToRoom('deleteFriend', friend);
    return friend;
  }
};
