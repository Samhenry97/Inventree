import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const FieldSchema = new Schema({
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
  preset: {
    type: String,
    trim: true,
    required: true
  },
  options: Schema.Types.Mixed
});
FieldSchema.plugin(timestamps);
FieldSchema.index({ type: 1 });

export const Field = mongoose.model('Field', FieldSchema);
