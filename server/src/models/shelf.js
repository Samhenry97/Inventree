import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const ShelfSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
      },
      type: {
        type: String,
        trim: true,
        required: true,
        default: 'book'
      },
      name: {
        type: String,
        trim: true,
        required: true
      },
      color: {
        type: String,
        trim: true,
        required: true,
        default: '#FFFFFFFF'
      }
    },
    { collection: 'shelves' }
);
ShelfSchema.plugin(timestamps);
ShelfSchema.index({ user: 1 });
ShelfSchema.index({ type: 1 });

export const Shelf = mongoose.model('Shelf', ShelfSchema);
