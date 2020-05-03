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
import Dashboard from '../views/home/Dashboard';

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
