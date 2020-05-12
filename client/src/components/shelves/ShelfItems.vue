<template>
  <CustomTable
      :items="items"
      :sortOptions="sortOptions"
  >
    <template #default="{ items }">
      <v-row>
        <v-col v-for="item of items" :key="item._id" cols="12" sm="6" md="4" lg="3">
          <ItemCard :item="item"></ItemCard>
        </v-col>
      </v-row>
    </template>
  </CustomTable>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CustomTable from '../CustomTable';
  import ItemCard from '../items/ItemCard';

  export default {
    name: 'ShelfItems',
    components: { ItemCard, CustomTable },
    props: {
      shelf: Object
    },
    computed: {
      ...mapGetters(['itemsInShelf']),
      items() {
        return this.itemsInShelf(this.shelf);
      }
    },
    data: () => ({
      sortOptions: [
        { text: 'Title', value: 'title' },
        { text: 'Subtitle', value: 'subtitle' },
        { text: 'Author', value: 'author' }
      ]
    })
  };
</script>

<style scoped>

</style>
