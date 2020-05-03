import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { Item } from './item';

export const ShelfSchema = new Schema(
    {
      type: {
        type: Schema.Types.ObjectID,
        ref: 'Type',
        required: true
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
ShelfSchema.pre('deleteOne', async function(next) {
  const shelf = await this.model.findOne(this.getQuery());
  await Item.updateMany({ shelves: shelf._id }, { $pull: { shelves: shelf._id } });
  next();
});

export const Shelf = mongoose.model('Shelf', ShelfSchema);
