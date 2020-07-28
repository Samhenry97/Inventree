import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const ConversationSchema = new Schema(
    {
      users: [{
        type: Schema.Types.ObjectID,
        ref: 'User'
      }],
      name: {
        type: String,
        trim: true
      }
    },
    { collection: 'conversations' }
);
ConversationSchema.plugin(timestamps);
ConversationSchema.index({ name: 1 });

export const Conversation = mongoose.model('Conversation', ConversationSchema);
