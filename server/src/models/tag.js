import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { Book } from './book';

export const TagSchema = new Schema(
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
      }
    },
    { collection: 'tags' }
);
TagSchema.plugin(timestamps);
TagSchema.index({ user: 1 });
TagSchema.index({ type: 1 });

// We want to remove the tag from everything using it
TagSchema.pre('deleteOne', async function(next) {
  const tag = await this.model.findOne(this.getQuery());
  if (tag.type === 'book') {
    await Book.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });
  }
  next();
});

export const Tag = mongoose.model('Tag', TagSchema);
