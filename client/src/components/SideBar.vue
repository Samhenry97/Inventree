<template>
  <v-navigation-drawer
      app
      :value="drawer"
      @input="setDrawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      mobile-break-point="md"
      :temporary="$vuetify.breakpoint.smAndDown"
      :permanent="$vuetify.breakpoint.mdAndUp"
  >
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { M_TOGGLE_DRAWER } from '../store/mutations.type';

  export default {
    name: 'SideBar',
    computed: mapGetters(['drawer']),
    methods: {
      setDrawer(value) {
        this.$store.commit(M_TOGGLE_DRAWER, value);
      }
    }
  };
</script>

<style scoped>

</style>
