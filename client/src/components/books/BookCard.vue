<template>
  <v-card class="action-card" hover ripple shaped @click="$emit('click')">
    <v-img height="192px" :src="book.smallThumbnail">
      <div class="img-overlay">
        <v-btn v-if="!checkoutOut" color="secondary" @click.stop="startReading">Start Reading</v-btn>
        <v-btn v-else color="primary" @click.stop="finishReading">Finish Reading</v-btn>
      </div>
    </v-img>
    <v-card-title>{{ book.title }}</v-card-title>
    <v-card-subtitle>{{ book.author }}</v-card-subtitle>
    <v-card-text>
      <v-rating
          v-model="book.rating"
          readonly
          half-increments
          empty-icon="mdi-heart-outline"
          half-icon="mdi-heart-half-full"
          full-icon="mdi-heart"
          color="red"
          background-color="grey"
      ></v-rating>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="edit(book)">Edit</v-btn>
      <v-btn color="error" text @click.stop="remove(book)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'BookCard',
    props: {
      book: Object,
      edit: Function,
      remove: Function
    },
    computed: {
      ...mapGetters(['checkoutOutForBook']),
      checkoutOut() {
        return this.checkoutOutForBook(this.book);
      }
    },
    methods: {
      startReading() {
        const checkout = {
          dateOut: new Date(),
          book: this.book
        };
        this.$socket.emit('createCheckout', checkout);
      },
      finishReading() {
        const checkout = { ...this.checkoutOut, dateIn: new Date() };
        this.$socket.emit('updateCheckout', checkout);
      }
    }
  };
</script>

<style scoped>

</style>
