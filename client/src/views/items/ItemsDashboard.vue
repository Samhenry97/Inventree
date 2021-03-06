<template>
  <div id="items-dashboard">
    <ItemEditDialog ref="editDialog" :item="editItem"></ItemEditDialog>

    <Header>
      My Items ({{ items.length }})
      <template #right>
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
      </template>
    </Header>

    <CustomTable
        v-if="cards"
        :items="items"
        :sortOptions="sortOptions"
    >
      <template #default="{ items }">
        <v-row>
          <v-col v-for="item of items" :key="item._id" cols="12" sm="6" md="4" lg="3">
            <ItemCard @click="edit(item)" :item="item" @edit="edit" @remove="remove"></ItemCard>
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
        <template #item.shelves="{ item }">
          {{ shelfNames(item) }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { A_DELETE_ITEM, A_DELETE_MANY_ITEMS } from '../../store/actions.type';
  import CustomTable from '../../components/CustomTable';
  import ItemCard from '../../components/items/ItemCard';
  import ItemEditDialog from '../../components/items/ItemEditDialog';
  import Header from '../../components/Header';

  export default {
    name: 'ItemsDashboard',
    components: { Header, ItemEditDialog, ItemCard, CustomTable },
    computed: {
      ...mapGetters(['items', 'type', 'shelfById', 'fields']),
      headers() {
        const headers = [{ text :'shelves', value: 'shelves' }];
        return headers.concat(this.fields
            .filter(field => field.options.tableDisplay)
            .map(field => ({ text: field.name, value: field.name })));
      },
      sortOptions() {
        return this.fields.map(field => ({ text: field.name, value: field.name }));
      }
    },
    data: () => ({
      editItem: null,
      cards: true,
      loading: false,
      selected: []
    }),
    methods: {
      edit(item) {
        this.editItem = item;
        this.$nextTick(() => this.$refs.editDialog.open());
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
