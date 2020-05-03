<template>
  <div id="items">
    <v-navigation-drawer
        app
        v-model="drawer"
        :clipped="$vuetify.breakpoint.mdAndUp"
        mobile-break-point="md"
        :temporary="$vuetify.breakpoint.smAndDown"
        :permanent="$vuetify.breakpoint.mdAndUp"
    >
      <v-list dense nav>
        <v-list-item :to="{ name: 'items' }" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ type.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'shelves' }" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-server</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Shelves</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="type.preset === 'book'" :to="{ name: 'checkouts' }" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Checkouts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'reports' }" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="type.preset === 'book'" :to="{ name: 'bookadd' }" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add {{ type.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <div class="pa-4">
        <Skeleton v-if="loading"></Skeleton>
        <router-view v-else></router-view>
      </div>
    </v-content>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Skeleton from '../../components/Skeleton';
  import { M_SET_SELECTED_CONTAINER, M_SET_SELECTED_TYPE } from '../../store/mutations.type';
  import { A_FETCH_ITEMS } from '../../store/actions.type';

  export default {
    name: 'Items',
    components: { Skeleton },
    computed: {
      ...mapGetters(['typeFindOne', 'containerFindOne', 'type'])
    },
    data: () => ({
      loading: true,
      drawer: null
    }),
    created() {
      const containerPath = this.$route.params.container;
      const typePath = this.$route.params.type;
      const container = this.containerFindOne({ path: containerPath });
      const type = this.typeFindOne(container._id, { path: typePath });
      this.$store.commit(M_SET_SELECTED_CONTAINER, container._id);
      this.$store.commit(M_SET_SELECTED_TYPE, type._id);
      this.$store.dispatch(A_FETCH_ITEMS, type._id)
          .then(() => this.loading = false);
    }
  };
</script>

<style scoped>

</style>
