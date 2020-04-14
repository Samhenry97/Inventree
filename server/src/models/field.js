import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const FieldSchema = new Schema({
  type: {
    type: Schema.Types.ObjectID,
    ref: 'Type',
    required: true
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true,
    enum: ['text', 'longtext', 'checkbox', 'select', 'multiselect', 'date', 'rating'],
    default: 'text'
  },
  options: {
    type: Schema.Types.Mixed,
    default: {}
  }
});
FieldSchema.plugin(timestamps);
FieldSchema.index({ type: 1 });

export const Field = mongoose.model('Field', FieldSchema);
