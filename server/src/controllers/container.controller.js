import { Container } from '../models/container';

export default {
  async getContainers(conn) {
    const containers = await Container.find({ user: conn.user._id });
    conn.send('setContainers', containers);
    for (const container of containers) {
      await conn.call('getTypes', container._id);
    }
    return containers;
  },
  async createContainer(conn, data) {
    data.user = conn.user._id;
    const container = await Container.create(data);
    conn.sendToRoom('createContainer', container);
    return container;
  },
  async updateContainer(conn, container) {
    await Container.updateOne({ _id: container._id }, container);
    conn.sendToRoom('updateContainer', container);
    return container;
  },
  async deleteContainer(conn, container) {
    await Container.deleteOne({ _id: container._id });
    conn.sendToRoom('deleteContainer', container);
    return container;
  }
};
