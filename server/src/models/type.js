import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const TypeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true
  },
  label: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  }
});
TypeSchema.plugin(timestamps);
TypeSchema.index({ user: 1 });
TypeSchema.index({ name: 1 });

export const Type = mongoose.model('Type', TypeSchema);
