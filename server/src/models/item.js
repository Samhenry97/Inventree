import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const ItemSchema = new Schema({
  type: {
    type: Schema.Types.ObjectID,
    ref: 'Type',
    required: true
  },
  shelves: [{
    type: Schema.Types.ObjectID,
    ref: 'Shelf'
  }],
  tags: [{
    type: Schema.Types.ObjectID,
    ref: 'Tag'
  }],
  data: {
    type: Schema.Types.Mixed,
    default: {}
  }
});
ItemSchema.plugin(timestamps);
ItemSchema.index({ type: 1 });

export const Item = mongoose.model('Item', ItemSchema);
