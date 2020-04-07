import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const TagSchema = new Schema(
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
      }
    },
    { collection: 'tags' }
);
TagSchema.plugin(timestamps);
TagSchema.index({ user: 1 });
TagSchema.index({ type: 1 });

export const Tag = mongoose.model('Tag', TagSchema);
