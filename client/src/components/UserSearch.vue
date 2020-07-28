<template>
  <v-autocomplete
      :items="items"
      :search-input.sync="search"
      :dense="$vuetify.breakpoint.smAndDown"
      :value="value"
      @input="$emit('input', $event)"
      item-text="name"
      return-object
      multiple
      cache-items
      solo-inverted
      flat
      hide-details
      label="Search Inventree"
      prepend-inner-icon="mdi-magnify"
  >
    <template #selection="{ item, attrs, selected, select }">
      <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="removeUser(item._id)"
      >
        <v-avatar left>
          <v-img :src="item.picture"></v-img>
        </v-avatar>
        {{ item.name }}
      </v-chip>
    </template>
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
    props: {
      value: {
        type: null,
        default: []
      }
    },
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
      removeUser(user) {
        this.$emit('input', this.value.filter(id => id !== user));
      }
    }
  };
</script>

<style scoped>

</style>
