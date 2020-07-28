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
    <UserSearch v-if="authed" v-model="selection"></UserSearch>
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template #activator="{ on }">
        <router-link :to="{ name: 'home' }">
          <v-btn role="button" icon v-on="on">
            <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
        </router-link>
      </template>
      Dashboard
    </v-tooltip>

    <v-tooltip v-if="authed" bottom>
      <template #activator="{ on }">
        <router-link :to="{ name: 'conversations' }">
          <v-btn role="button" icon v-on="on">
            <v-icon>mdi-message</v-icon>
          </v-btn>
        </router-link>
      </template>
      Messages
    </v-tooltip>

    <v-tooltip v-if="authed" bottom>
      <template #activator="{ on }">
        <v-menu v-model="profileLargeMenu">
          <template #activator="{ on: menuOn }">
            <v-avatar role="button" class="ml-4" v-on="{ ...menuOn, ...on }">
              <v-img :src="user.picture"></v-img>
            </v-avatar>
          </template>

          <AppBarOptions></AppBarOptions>
        </v-menu>
      </template>
      Settings
    </v-tooltip>

    <v-tooltip v-else bottom>
      <template #activator="{ on }">
        <v-btn icon v-on="on" @click="$auth.loginWithRedirect">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      Login
    </v-tooltip>
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

    <v-tooltip v-if="authed" bottom>
      <template #activator="{ on }">
        <v-btn role="button" icon v-on="on" @click="search = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
      Search
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="{ on }">
        <router-link :to="{ name: 'home' }">
          <v-btn icon v-on="on">
            <v-icon>mdi-view-dashboard</v-icon>
          </v-btn>
        </router-link>
      </template>
      Dashboard
    </v-tooltip>

    <v-tooltip v-if="authed" bottom>
      <template #activator="{ on }">
        <router-link :to="{ name: 'conversations' }">
          <v-btn icon v-on="on">
            <v-icon>mdi-message</v-icon>
          </v-btn>
        </router-link>
      </template>
      Messages
    </v-tooltip>

    <v-tooltip v-if="authed" bottom>
      <template #activator="{ on }">
        <v-menu v-model="profileSmallMenu">
          <template #activator="{ on: menuOn }">
            <v-btn icon v-on="{ ...on, ...menuOn }">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <AppBarOptions></AppBarOptions>
        </v-menu>
      </template>
      Settings
    </v-tooltip>

    <v-tooltip v-else bottom>
      <template #activator="{ on }">
        <v-btn icon v-on="on" @click="$auth.loginWithRedirect">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      Login
    </v-tooltip>
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

    <UserSearch @select="search = false" v-model="selection"></UserSearch>
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
      search: false,
      selection: []
    }),
    watch: {
      selection(val) {
        if (val.length > 0) {
          this.$router.push({ name: 'user-profile', params: { user: val[0]._id } });
          this.selection = [];
        }
      }
    },
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
