<template>
  <div id="book-checkouts">
    <CheckoutEditDialog :checkout="editCheckout" :book="book" ref="editDialog"></CheckoutEditDialog>

    <div v-if="!forBook">
      <p class="display-1 mb-0">My Checkouts ({{ checkouts.length }})</p>
      <v-divider class="my-2"></v-divider>
    </div>

    <v-row v-if="forBook">
      <v-col cols="12">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="edit(null)">
            <v-icon class="mr-2">mdi-plus</v-icon>
            Add Checkout
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="checkout of checkouts" :key="checkout._id" cols="12" sm="6" md="4" lg="3">
        <CheckoutCard
            @click="edit(checkout)"
            :checkout="checkout"
            :edit="edit"
            :remove="remove"
            :showBook="!forBook"
        ></CheckoutCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CheckoutEditDialog from '../../components/checkouts/CheckoutEditDialog';
  import CheckoutCard from '../../components/checkouts/CheckoutCard';

  export default {
    name: 'CheckoutsDashboard',
    components: { CheckoutEditDialog, CheckoutCard },
    props: {
      book: Object
    },
    computed: {
      ...mapGetters({
        checkoutsForBook: 'checkoutsForBook',
        allCheckouts: 'checkouts'
      }),
      forBook() {
        return !!this.book;
      },
      checkouts() {
        if (this.forBook) {
          return this.checkoutsForBook(this.book);
        } else {
          return this.allCheckouts;
        }
      }
    },
    data: () => ({
      editCheckout: {}
    }),
    methods: {
      edit(checkout) {
        this.editCheckout = checkout;
        this.$refs.editDialog.open();
      },
      remove(checkout) {
        if (confirm('Are you sure you want to delete this checkout?')) {
          this.$socket.emit('deleteCheckout', checkout);
        }
      }
    }
  };
</script>

<style scoped>

</style>
