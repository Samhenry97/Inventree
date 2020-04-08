import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const CheckoutSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
      },
      book: {
        type: Schema.Types.ObjectID,
        ref: 'Book',
        required: true
      },
      dateOut: Date,
      dateIn: Date
    },
    { collection: 'checkouts' }
);
CheckoutSchema.plugin(timestamps);
CheckoutSchema.index({ user: 1 });
CheckoutSchema.index({ dateOut: 1 });
CheckoutSchema.index({ dateIn: 1 });

export const Checkout = mongoose.model('Checkout', CheckoutSchema);
