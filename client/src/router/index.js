import Vue from 'vue';
import Router from 'vue-router';
import { authGuard } from '../common/authGuard';
import Home from '../views/Home';
import Books from '../views/Books';
import BooksSidebar from '../views/books/BooksSidebar';
import BookAdd from '../views/books/BookAdd';
import BooksDashboard from '../views/books/BooksDashboard';
import Settings from '../views/Settings';
import Profile from '../views/Profile';
import ShelvesDashboard from '../views/shelves/ShelvesDashboard';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
      path: '/books',
      components: {
        default: Books,
        sidebar: BooksSidebar
      },
      children: [
        {
          path: 'library',
          name: 'books',
          component: BooksDashboard,
          meta: { title: 'Library' }
        },
        {
          path: 'add',
          name: 'bookadd',
          component: BookAdd,
          meta: { title: 'Add Books' }
        },
        {
          path: 'shelves',
          name: 'book-shelves',
          component: ShelvesDashboard,
          meta: { title: 'Shelves' },
          props: { type: 'book' }
        }
      ],
      meta: { title: 'Books' }
    }
  ]
});

router.beforeEach(authGuard);
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Inventree` : 'Inventree';
  next();
});

export default router;
