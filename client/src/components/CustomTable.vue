<template>
  <v-data-iterator
      v-if="items.length > 0"
      :items="items"
      :page="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :custom-filter="customFilter || undefined"
      :custom-sort="customSort || undefined"
      :items-per-page="itemsPerPage"
      hide-default-footer
  >
    <template #header>
      <v-toolbar dark color="secondary">
        <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="sortOptions"
            prepend-inner-icon="mdi-sort-alphabetical-variant"
            label="Sort by..."
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="sortDesc" mandatory>
          <v-btn large depressed color="secondary" :value="false">
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn large depressed color="secondary" :value="true">
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </template>

    <template #default="{ items }">
      <slot :items="items"></slot>
    </template>

    <template #no-results>
      <slot name="no-results">
        <p class="pa-4 text-center">No results found for "<b>{{ search }}</b>".</p>
      </slot>
    </template>

    <template #footer="{ pagination }">
      <v-divider></v-divider>
      <div class="d-flex align-center">
        <v-select
            :items="[4, 8, 12, 16]"
            v-model="itemsPerPage"
            label="Items per page"
        ></v-select>
        <v-pagination v-model="page" :length="pagination.pageCount"></v-pagination>
      </div>
    </template>
  </v-data-iterator>

  <div v-else>
    <slot name="no-data">
      <p class="pa-4 text-center">Nothing here!</p>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'CustomTable',
    props: {
      items: Array,
      sortOptions: Array,
      customSort: Function,
      customFilter: Function
    },
    data: () => ({
      page: 0,
      search: '',
      sortBy: '',
      sortDesc: false,
      itemsPerPage: 12
    })
  };
</script>

<style scoped>

</style>
