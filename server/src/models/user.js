import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { Shelf } from './shelf';

export const UserSchema = new Schema(
    {
      sub: {
        type: String,
        trim: true,
        required: true
      },
      name: {
        type: String,
        trim: true,
        required: true
      },
      email: {
        type: String,
        trim: true,
        required: true
      },
      nickname: {
        type: String,
        trim: true,
      },
      picture: {
        type: String,
        trim: true
      },
      darkMode: {
        type: Boolean,
        default: false
      }
    },
    { collection: 'users' }
);
UserSchema.plugin(timestamps);
UserSchema.index({ email: 1 });

UserSchema.post('save', async function(user, next) {
  if (user.isNew) {
    await Shelf.create({ user: user._id, type: 'book', name: 'Default' });
  }
  next();
});

export const User = mongoose.model('User', UserSchema);
