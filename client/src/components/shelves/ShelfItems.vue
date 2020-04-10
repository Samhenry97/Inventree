<template>
  <v-row>
    <v-col v-for="item of items" :key="item._id" cols="12" sm="6" md="4" lg="3">
      <BookCard :book="item"></BookCard>
    </v-col>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BookCard from '../books/BookCard';

  export default {
    name: 'ShelfBooks',
    components: { BookCard },
    props: {
      shelf: Object
    },
    computed: {
      ...mapGetters(['itemsInShelf']),
      items() {
        return this.itemsInShelf(this.shelf);
      }
    }
  };
</script>

<style scoped>

</style>
