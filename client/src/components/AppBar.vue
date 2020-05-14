<template>
  <v-app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      color="primary"
      clipped-left
      app
      dark
      key="largeAppBar"
  >
    <v-toolbar-title class="ml-0 pl-4">Inventree</v-toolbar-title>

    <v-spacer></v-spacer>
    <UserSearch v-if="authed"></UserSearch>
    <v-spacer></v-spacer>

    <router-link :to="{ name: 'home' }">
      <v-btn depressed color="primary">
        <v-icon class="mr-2">mdi-home</v-icon>
        Home
      </v-btn>
    </router-link>

    <v-menu v-if="authed" v-model="profileLargeMenu">
      <template #activator="{ on }">
        <v-avatar role="button" class="ml-4" v-on="on">
          <v-img :src="user.picture"></v-img>
        </v-avatar>
      </template>

      <AppBarOptions></AppBarOptions>
    </v-menu>

    <v-btn v-else color="primary" depressed @click="$auth.loginWithPopup">
      <v-icon class="mr-1">mdi-face</v-icon>
      Sign In
    </v-btn>
  </v-app-bar>

  <v-app-bar
      v-else-if="!search"
      color="primary"
      app
      dark
      key="smallAppBar"
  >
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>
    <v-toolbar-title>Inventree</v-toolbar-title>
    <v-spacer></v-spacer>

    <router-link :to="{ name: 'home' }">
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </router-link>

    <v-btn v-if="authed" icon @click="search = true">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu v-if="authed" v-model="profileSmallMenu">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <AppBarOptions></AppBarOptions>
    </v-menu>

    <v-btn v-else color="primary" depressed @click="$auth.loginWithPopup">
      <v-icon class="mr-1">mdi-face</v-icon>
      Sign In
    </v-btn>
  </v-app-bar>

  <v-app-bar
      v-else
      color="primary"
      app
      dark
      key="smallSearchBar"
  >
    <v-btn class="mr-2" icon @click="search = false">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <UserSearch @select="search = false"></UserSearch>
  </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex';
  import UserSearch from './UserSearch';
  import { M_TOGGLE_DRAWER } from '../store/mutations.type';
  import AppBarOptions from './AppBarOptions';

  export default {
    name: 'AppBar',
    components: { AppBarOptions, UserSearch },
    data: () => ({
      profileSmallMenu: false,
      profileLargeMenu: false,
      search: false
    }),
    computed: {
      ...mapGetters(['authed', 'user'])
    },
    methods: {
      toggleDrawer() {
        this.$store.commit(M_TOGGLE_DRAWER);
      }
    }
  };
</script>

<style scoped>

</style>
