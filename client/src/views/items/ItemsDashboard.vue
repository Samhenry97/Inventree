<template>
  <div id="items-dashboard">
    <BookEditDialog ref="editDialog" :book="editItem"></BookEditDialog>

    <div class="d-flex align-center">
      <p class="display-1 mb-0">My Items ({{ items.length }})</p>
      <v-spacer></v-spacer>
      <v-btn-toggle class="mr-2" v-model="cards" mandatory dense>
        <v-btn text color="secondary" :value="true">
          <v-icon class="mr-2" color="secondary">mdi-card</v-icon>
          Cards
        </v-btn>
        <v-btn text color="secondary" :value="false">
          <v-icon class="mr-2" color="secondary">mdi-table</v-icon>
          Table
        </v-btn>
      </v-btn-toggle>
      <router-link :to="{ name: 'bookadd' }">
        <v-btn color="secondary">
          <v-icon class="mr-2">mdi-plus</v-icon>
          Add Item
        </v-btn>
      </router-link>
    </div>

    <v-divider class="my-2"></v-divider>

    <CustomTable
        v-if="cards"
        :items="items"
        :sortOptions="sortOptions"
    >
      <template #default="{ items }">
        <v-row>
          <v-col v-for="item of items" :key="item._id" cols="12" sm="6" md="4" lg="3">
            <BookCard @click="edit(item)" :item="item" :edit="edit" :remove="remove"></BookCard>
          </v-col>
        </v-row>
      </template>

      <template #no-data>
        <p class="pa-4 text-center">No items here. <router-link :to="{ name: 'bookadd' }">Add</router-link> some to get started!</p>
      </template>
    </CustomTable>

    <div v-else>
      <div v-if="selected.length > 0" class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-2" @click="removeSelected">
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete Selected
        </v-btn>
        <v-btn color="secondary" @click="editSelected">
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Selected
        </v-btn>
      </div>
      <v-data-table
          @click:row="edit"
          v-model="selected"
          show-select
          :headers="headers"
          :items="items"
          :items-per-page="12"
          :loading="loading"
          item-key="_id"
          class="elevation-2 mt-2"
      >
        <template v-slot:item.shelves="{ item }">
          {{ shelfNames(item) }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BookEditDialog from '../../components/books/BookEditDialog';
  import { A_DELETE_ITEM, A_DELETE_MANY_ITEMS } from '../../store/actions.type';
  import CustomTable from '../../components/CustomTable';
  import BookCard from '../../components/books/BookCard';

  export default {
    name: 'ItemsDashboard',
    components: { BookCard, CustomTable, BookEditDialog },
    computed: {
      ...mapGetters(['items', 'type', 'shelfById'])
    },
    data: () => ({
      headers: [
        {
          text: 'Shelves',
          value: 'shelves'
        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Subtitle',
          value: 'subtitle'
        },
        {
          text: 'Author',
          value: 'author'
        },
        {
          text: 'ISBN 10',
          value: 'isbn10'
        },
        {
          text: 'ISBN 13',
          value: 'isbn13'
        }
      ],
      sortOptions: [
        { text: 'Title', value: 'title' },
        { text: 'Subtitle', value: 'subtitle' },
        { text: 'Author', value: 'author' }
      ],
      editItem: null,
      cards: true,
      loading: false,
      selected: []
    }),
    methods: {
      edit(item) {
        this.editItem = item;
        this.$refs.editDialog.open();
      },
      remove(item) {
        if (confirm('Are you sure you want to delete this item?')) {
          this.$store.dispatch(A_DELETE_ITEM, item);
        }
      },
      editSelected() {
        // TODO: Multi edit
      },
      removeSelected() {
        if (confirm(`Are you sure you want to delete ${this.selected.length} items?`)) {
          this.loading = true;
          const ids = this.selected.map(item => item._id);
          this.$store.dispatch(A_DELETE_MANY_ITEMS, { type: this.type._id, ids })
              .then(() => this.loading = false);
        }
      },
      shelfNames(item) {
        const names = item.shelves.map(shelf => this.shelfById(shelf).name);
        return names.join(', ');
      }
    }
  };
</script>

<style scoped>

</style>
