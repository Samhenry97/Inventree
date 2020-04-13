<template>
  <div id="shelves-dashboard">
    <ShelfEditDialog ref="editDialog" :shelf="editShelf" :type="type"></ShelfEditDialog>

    <div class="d-flex align-center">
      <p class="display-1 mb-0">My Shelves ({{ shelves.length }})</p>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="edit(null)">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Add Shelf
      </v-btn>
    </div>

    <v-divider class="my-2"></v-divider>

    <CustomTable
        :items="shelves"
        :sortOptions="[{ text: 'Name', value: 'name' }]"
    >
      <template #default="{ items: shelves }">
        <v-row v-if="cards === 0">
          <v-col v-for="shelf of shelves" :key="shelf._id" cols="12" sm="6" md="4" lg="3">
            <ShelfCard @click="edit(shelf)" :shelf="shelf" :edit="edit" :remove="remove"></ShelfCard>
          </v-col>
        </v-row>
      </template>

      <template #no-data>
        <p class="pa-4 text-center">No shelves here. <a @click="edit(null)">Add</a> some to get started!</p>
      </template>
    </CustomTable>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ShelfCard from '../../components/shelves/ShelfCard';
  import ShelfEditDialog from '../../components/shelves/ShelfEditDialog';
  import { A_DELETE_SHELF } from '../../store/actions.type';
  import CustomTable from '../../components/CustomTable';

  export default {
    name: 'ShelvesDashboard',
    props: {
      type: String
    },
    data: () => ({
      cards: 0,
      editShelf: null
    }),
    components: {
      CustomTable,
      ShelfEditDialog,
      ShelfCard
    },
    computed: {
      ...mapState({
        allShelves: state => state.shelves
      }),
      shelves() {
        return this.allShelves[this.type];
      }
    },
    methods: {
      edit(shelf) {
        this.editShelf = shelf;
        this.$refs.editDialog.open();
      },
      remove(shelf) {
        if(confirm('Are you sure you want to delete this shelf?')) {
          this.$store.dispatch(A_DELETE_SHELF, shelf);
        }
      }
    }
  };
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
