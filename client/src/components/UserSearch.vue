<template>
  <v-autocomplete
      :items="items"
      :search-input.sync="search"
      v-model="selection"
      @input="visitProfile"
      item-text="name"
      item-value="_id"
      cache-items
      solo-inverted
      flat
      hide-details
      label="Search Users..."
      prepend-inner-icon="mdi-magnify"
  >
    <template #item="{ item }">
      <v-list-item-avatar>
        <v-img :src="item.picture"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
  import { A_SEARCH_USERS } from '../store/actions.type';

  export default {
    name: 'UserSearch',
    data: () => ({
      loading: false,
      items: [],
      search: null,
      selection: null
    }),
    watch: {
      search(val) {
        val && this.performSearch(val);
      }
    },
    methods: {
      performSearch(query) {
        this.$store.dispatch(A_SEARCH_USERS, query)
            .then(items => {
              this.items = items;
              this.loading = false;
            });
      },
      visitProfile(user) {
        this.$emit('select', user);
        this.$nextTick(() => this.selection = null);
        this.$router.push({ name: 'user-profile', params: { user } });
      }
    }
  };
</script>

<style scoped>

</style>
