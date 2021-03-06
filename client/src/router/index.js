import Vue from 'vue';
import Router from 'vue-router';
import { authGuard } from '../common/authGuard';
import BookAdd from '../views/items/presets/books/BookAdd';
import Settings from '../views/Settings';
import Profile from '../views/Profile';
import ShelvesDashboard from '../views/items/shelves/ShelvesDashboard';
import CheckoutsDashboard from '../views/items/checkouts/CheckoutsDashboard';
import ReportsDashboard from '../views/items/reports/ReportsDashboard';
import Items from '../views/items/Items';
import ItemsDashboard from '../views/items/ItemsDashboard';
import Dashboard from '../views/Dashboard';
import FieldsDashboard from '../views/items/fields/FieldsDashboard';
import UserProfile from '../views/users/UserProfile';
import ConversationsDashboard from '../views/conversations/ConversationsDashboard';
import Conversation from '../views/conversations/Conversation';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: { title: 'Home' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { title: 'Profile' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: { title: 'Settings' }
    },
    {
      path: '/u/:user',
      name: 'user-profile',
      component: UserProfile
    },
    {
      path: '/m',
      name: 'conversations',
      component: ConversationsDashboard,
      meta: { title: 'Conversations' },
      children: [
        {
          path: ':conversation',
          name: 'conversation',
          component: Conversation
        }
      ]
    },
    {
      path: '/c/:container/:type',
      component: Items,
      children: [
        {
          path: 'items',
          name: 'items',
          component: ItemsDashboard,
          meta: { title: 'Items' }
        },
        {
          path: 'shelves',
          name: 'shelves',
          component: ShelvesDashboard,
          meta: { title: 'Shelves' }
        },
        {
          path: 'reports',
          name: 'reports',
          component: ReportsDashboard,
          meta: { title: 'Reports' }
        },
        {
          path: 'checkouts',
          name: 'checkouts',
          component: CheckoutsDashboard,
          meta: { title: 'Checkouts' }
        },
        {
          path: 'bookadd',
          name: 'bookadd',
          component: BookAdd,
          meta: { title: 'Add Books' }
        },
        {
          path: 'fields',
          name: 'fields',
          component: FieldsDashboard,
          meta: { title: 'Fields' }
        }
      ]
    }
  ]
});

router.beforeEach(authGuard);
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Inventree` : 'Inventree';
  next();
});

export default router;
