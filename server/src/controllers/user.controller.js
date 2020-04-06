import { User } from '../models/user';
import { Shelf } from '../models/shelf';

export default {
  async login(conn, data) {
    let user = await User.findOne({ sub: data.sub });
    if (!user) {
      user = await createUser(data);
    }
    conn.login(user);
    conn.send('setUser', user);
  },
  logout(conn) {
    conn.logout();
  },
  async updateUser(conn, data) {
    await User.updateOne({ _id: data._id }, data);
    conn.sendToRoom('setUser', data);
  }
};

async function createUser(data) {
  const user = await User.create(data);
  await Shelf.create({ user: user._id, type: 'book', name: 'Default' });
  return user;
}
