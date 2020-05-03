import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const ContainerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    path: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
  },
  { collection: 'containers' }
);
ContainerSchema.plugin(timestamps);
ContainerSchema.index({ name: 1 });

export const Container = mongoose.model('Container', ContainerSchema);
