import store from '../store';

export const authGuard = (to, from, next) => {
  if (store.state.user.user._id || to.name === 'home') {
    return next();
  }

  next({ name: 'home' });
};
