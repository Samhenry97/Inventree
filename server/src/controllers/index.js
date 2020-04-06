import bookController from './book.controller';
import userController from './user.controller';
import generalController from './general.controller';
import shelfController from './shelf.controller';

export default {
  ...bookController,
  ...userController,
  ...generalController,
  ...shelfController
};
