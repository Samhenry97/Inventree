import itemController from './item.controller';
import userController from './user.controller';
import generalController from './general.controller';
import shelfController from './shelf.controller';
import tagController from './tag.controller';
import checkoutController from './checkout.controller';
import reportController from './report.controller';
import containerController from './container.controller';
import typeController from './type.controller';
import fieldController from './field.controller';
import conversationController from './conversation.controller';
import messageController from './message.controller';

export default {
  ...itemController,
  ...userController,
  ...generalController,
  ...shelfController,
  ...tagController,
  ...checkoutController,
  ...reportController,
  ...containerController,
  ...typeController,
  ...fieldController,
  ...conversationController,
  ...messageController
};
