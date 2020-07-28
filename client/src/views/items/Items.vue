<template>
  <fragment>
    <SideBar>
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
        <v-list-item :to="{ name: 'fields' }" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-text-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Fields</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </SideBar>

    <v-content>
      <div class="pa-4">
        <Skeleton v-if="loading"></Skeleton>
        <router-view v-else></router-view>
      </div>
    </v-content>
  </fragment>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Skeleton from '../../components/Skeleton';
  import { A_FETCH_ITEMS } from '../../store/actions.type';
  import SideBar from '../../components/SideBar';

  export default {
    name: 'Items',
    components: { SideBar, Skeleton },
    computed: {
      ...mapGetters(['typeFindOne', 'containerFindOne', 'type', 'drawer'])
    },
    data: () => ({
      loading: true
    }),
    created() {
      this.$store.dispatch(A_FETCH_ITEMS, this.$route.params.type)
          .then(() => this.loading = false);
    }
  };
</script>

<style scoped>

</style>
