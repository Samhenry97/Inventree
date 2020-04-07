import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const BookSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true
    },
    shelf: {
      type: Schema.Types.ObjectID,
      ref: 'Shelf',
      required: true
    },
    title: {
      type: String,
      trim: true,
      required: true
    },
    subtitle: {
      type: String,
      trim: true
    },
    publisher: {
      type: String,
      trim: true
    },
    published: {
      type: String,
      trim: true
    },
    pageCount: Number,
    printType: {
      type: String,
      trim: true
    },
    maturityRating: {
      type: String,
      trim: true
    },
    thumbnail: {
      type: String,
      trim: true
    },
    smallThumbnail: {
      type: String,
      trim: true
    },
    language: {
      type: String,
      trim: true
    },
    author: {
      type: String,
      trim: true
    },
    from: {
      type: String,
      trim: true
    },
    fromid: {
      type: String,
      trim: true
    },
    isbn10: {
      type: String,
      trim: true
    },
    isbn13: {
      type: String,
      trim: true
    },
    description: String,
    rating: Number,
    tags: [{
      type: Schema.Types.ObjectID,
      ref: 'Tag'
    }]
  },
  { collection: 'books' }
);
BookSchema.plugin(timestamps);
BookSchema.index({ user: 1 });

export const Book = mongoose.model('Book', BookSchema);
