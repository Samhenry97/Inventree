import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const MessageSchema = new Schema(
    {
      conversation: {
        type: Schema.Types.ObjectID,
        ref: 'Conversation',
        required: true
      },
      user: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      content: {
        type: String,
        required: true
      }
    },
    { collection: 'messages' }
);
MessageSchema.plugin(timestamps);
MessageSchema.index({ conversation: 1 });
MessageSchema.index({ user: 1 });

export const Message = mongoose.model('Message', MessageSchema);
