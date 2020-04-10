import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { Book } from './book';

export const ShelfSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
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

// We want to remove the tag from everything using it
ShelfSchema.pre('remove', function(next) {
  Book.updateMany({ shelves: this._id }, { $pullAll: { shelves: this._id } });
  next();
});

export const Shelf = mongoose.model('Shelf', ShelfSchema);
