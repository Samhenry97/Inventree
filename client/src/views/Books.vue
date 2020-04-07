<template>
  <div id="books">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Books',
  beforeCreate() {
    this.$socket.emit('getBooks');
    this.$socket.emit('getShelves', { type: 'book' });
    this.$socket.emit('getTags', { type: 'book' });
  },
};
</script>

<style scoped>

</style>
