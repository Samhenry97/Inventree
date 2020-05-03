import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const CheckoutSchema = new Schema(
    {
      type: {
        type: Schema.Types.ObjectID,
        ref: 'Type',
        required: true
      },
      item: {
        type: Schema.Types.ObjectID,
        ref: 'Item',
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
