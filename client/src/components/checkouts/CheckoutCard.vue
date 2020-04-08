<template>
  <v-card hover ripple shaped @click="$emit('click')">
    <div v-if="showBook">
      <v-img height="192px" :src="book.smallThumbnail"></v-img>
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-subtitle>{{ book.author }}</v-card-subtitle>
    </div>
    <v-card-text>
      <b>Date Out:</b> {{ formatDate(checkout.dateOut) }}
      <br>
      <b>Date In:</b> {{ formatDate(checkout.dateIn) }}
      <br>
      <b>Total Time:</b> {{ dateDifference(checkout.dateOut, checkout.dateIn) }}
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="edit(checkout)">Edit</v-btn>
      <v-btn color="error" text @click.stop="remove(checkout)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Book from '../../models/book';
  import { formatDate, dateDifference } from '../../common/util';

  export default {
    name: 'BookCard',
    props: {
      checkout: Object,
      edit: Function,
      remove: Function,
      showBook: Boolean
    },
    computed: {
      book() {
        return Book.getById(this.checkout.book);
      },
      ...mapGetters(['books'])
    },
    data: () => ({
      formatDate,
      dateDifference
    })
  };
</script>

<style scoped>

</style>
