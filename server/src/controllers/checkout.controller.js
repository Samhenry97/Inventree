import { Checkout } from '../models/checkout';

export default {
  async getCheckouts(conn) {
    const checkouts = await Checkout.find({ user: conn.user._id });
    conn.send('setCheckouts', checkouts);
    return checkouts;
  },
  async createCheckout(conn, data) {
    data.user = conn.user._id;
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
