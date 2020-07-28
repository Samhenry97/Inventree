import store from '../store';

export const authGuard = (to, from, next) => {
  if (store.state.user.authed || to.name === 'home') {
    return next();
  }

  const unwatch = store.watch(
      state => state.user.loading,
      loading => {
        if (!loading) {
          unwatch();
          if (store.state.user.authed) next();
          else next({ name: 'home' });
        }
      }
  );
};
