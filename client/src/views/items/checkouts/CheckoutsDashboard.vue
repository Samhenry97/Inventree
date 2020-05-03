<template>
  <div id="book-checkouts">
    <CheckoutEditDialog :checkout="editCheckout" :item="item" ref="editDialog"></CheckoutEditDialog>

    <div v-if="!forItem">
      <p class="display-1 mb-0">My Checkouts ({{ checkouts.length }})</p>
      <v-divider class="my-2"></v-divider>
    </div>
    <v-row v-else>
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

    <CustomTable
        :items="checkouts"
        :sortOptions="[{ text: 'Date In', value: 'dateIn' }, { text: 'Date Out', value: 'dateOut' }]"
        :customFilter="customFilter"
    >
      <template #default="{ items: checkouts }">
        <v-row>
          <v-col v-for="checkout of checkouts" :key="checkout._id" cols="12" sm="6" md="4" lg="3">
            <CheckoutCard
                @click="edit(checkout)"
                :checkout="checkout"
                :edit="edit"
                :remove="remove"
                :showItem="!forItem"
            ></CheckoutCard>
          </v-col>
        </v-row>
      </template>

      <template #no-data>
        <p class="pa-4 text-center">No checkouts yet. <router-link :to="{ name: 'items' }">Start reading</router-link>!</p>
      </template>
    </CustomTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CheckoutEditDialog from '../../../components/checkouts/CheckoutEditDialog';
  import CheckoutCard from '../../../components/checkouts/CheckoutCard';
  import { A_DELETE_CHECKOUT } from '../../../store/actions.type';
  import CustomTable from '../../../components/CustomTable';

  export default {
    name: 'CheckoutsDashboard',
    components: { CustomTable, CheckoutEditDialog, CheckoutCard },
    props: {
      item: Object
    },
    computed: {
      ...mapGetters({
        checkoutsForItem: 'checkoutsForItem',
        allCheckouts: 'checkouts',
        itemById: 'itemById'
      }),
      forItem() {
        return !!this.item;
      },
      checkouts() {
        if (this.forItem) {
          return this.checkoutsForItem(this.item);
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
          this.$store.dispatch(A_DELETE_CHECKOUT, checkout);
        }
      },
      customFilter(items, search) {
        if (!search) return items;

        search = search.toLowerCase();
        const results = [];
        const itemFields = ['title', 'subtitle', 'author'];
        for (const checkout of items) {
          const book = this.itemById(checkout.item);
          for (const field of itemFields) {
            if (book[field].toLowerCase().includes(search)) {
              results.push(checkout);
              break;
            }
          }
        }
        return results;
      }
    }
  };
</script>

<style scoped>

</style>
