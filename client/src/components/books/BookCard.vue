<template>
  <v-card class="action-card" hover ripple shaped @click="$emit('click')">
    <v-img height="192px" :src="book.smallThumbnail">
      <div class="img-overlay">
        <v-btn v-if="!checkoutOut" color="secondary" @click.stop="startReading">Start Reading</v-btn>
        <v-btn v-else color="primary" @click.stop="finishReading">Finish Reading</v-btn>
      </div>
    </v-img>
    <v-card-title><v-clamp autoresize :max-lines="2">{{ book.title }}</v-clamp></v-card-title>
    <v-card-subtitle><v-clamp autoresize :max-lines="1">{{ book.author }}</v-clamp></v-card-subtitle>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="edit(book)">Edit</v-btn>
      <v-btn color="error" text @click.stop="remove(book)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import VClamp from 'vue-clamp';
  import { A_CREATE_CHECKOUT, A_UPDATE_CHECKOUT } from '../../store/actions.type';

  export default {
    name: 'BookCard',
    components: {
      VClamp
    },
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
        this.$store.dispatch(A_CREATE_CHECKOUT, checkout);
      },
      finishReading() {
        const checkout = { ...this.checkoutOut, dateIn: new Date() };
        this.$store.dispatch(A_UPDATE_CHECKOUT, checkout);
      }
    }
  };
</script>

<style scoped>

</style>
