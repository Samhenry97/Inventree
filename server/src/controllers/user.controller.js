import { User } from '../models/user';

export default {
  async login(conn, data) {
    let user = await User.findOne({ sub: data.sub });
    if (!user) user = await User.create(data);
    conn.login(user);
    conn.send('setUser', user);
    return user;
  },
  async logout(conn) {
    conn.logout();
  },
  async updateUser(conn, user) {
    await User.updateOne({ _id: user._id }, user);
    conn.sendToRoom('setUser', user);
    return user;
  }
};
