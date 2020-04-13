<template>
  <div id="books">
    <Skeleton v-if="loading"></Skeleton>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { A_FETCH_ITEMS } from '../store/actions.type';
import Skeleton from '../components/Skeleton';

export default {
  name: 'Books',
  components: { Skeleton },
  data: () => ({
    loading: true
  }),
  beforeCreate() {
    this.loading = true;
    this.$store.dispatch(A_FETCH_ITEMS, 'book')
        .then(() => this.loading = false)
        .catch(err => this.$snackbar.error(err));
  },
};
</script>

<style scoped>

</style>
