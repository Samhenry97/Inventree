import { Checkout } from '../models/checkout';

export default {
  async getCheckouts(conn, type) {
    const checkouts = await Checkout.find({ type });
    conn.send('setCheckouts', { type, checkouts });
    return checkouts;
  },
  async createCheckout(conn, data) {
    const checkout = await Checkout.create(data);
    conn.sendToRoom('createCheckout', checkout);
    return checkout;
  },
  async updateCheckout(conn, checkout) {
    await Checkout.updateOne({ _id: checkout._id }, checkout);
    conn.sendToRoom('updateCheckout', checkout);
    return checkout;
  },
  async deleteCheckout(conn, checkout) {
    await Checkout.deleteOne({ _id: checkout._id });
    conn.sendToRoom('deleteCheckout', checkout);
    return checkout;
  }
};
