import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { Checkout } from './checkout';

export const BookSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true
    },
    shelves: [{
      type: Schema.Types.ObjectID,
      ref: 'Shelf'
    }],
    tags: [{
      type: Schema.Types.ObjectID,
      ref: 'Tag'
    }],
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
    description: {
      type: String,
      trim: true
    },
    rating: Number
  },
  { collection: 'books' }
);
BookSchema.plugin(timestamps);
BookSchema.index({ user: 1 });
BookSchema.index({ createdAt: 1 });

// We want to remove the checkouts associated with the book
BookSchema.pre('deleteOne', async function(next) {
  const query = this.getQuery();
  const id = query._id || (await this.model.findOne(query))._id;
  await Checkout.deleteMany({ book: id });
  next();
});

BookSchema.pre('deleteMany', async function(next) {
  const query = this.getQuery();
  const ids = (await this.model.find(query)).map(item => item._id);
  await Checkout.deleteMany({ book: { $in: ids } });
  next();
});

export const Book = mongoose.model('Book', BookSchema);
