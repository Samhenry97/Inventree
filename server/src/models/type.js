import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const TypeSchema = new Schema({
  container: {
    type: Schema.Types.ObjectID,
    ref: 'Container',
    required: true
  },
  preset: {
    type: String,
    enum: ['book']
  },
  name: {
    type: String,
    trim: true,
    required: true
  }
});
TypeSchema.plugin(timestamps);
TypeSchema.index({ collection: 1 });
TypeSchema.index({ name: 1 });

export const Type = mongoose.model('Type', TypeSchema);
