<template>
  <v-app id="app">
    <ConnectionHandler></ConnectionHandler>

    <div v-if="loading" class="loading-container">
      <v-progress-linear
          :size="128"
          :width="12"
          indeterminate
          color="secondary"
      ></v-progress-linear>

      <div class="loading mb-12">
        <div>
          <img :src="require('./assets/logo.png')"/>
        </div>
        <p class="display-4">Inventree</p>
      </div>
    </div>

    <div v-else>
      <v-app-bar
          :clipped-left="$vuetify.breakpoint.mdAndUp"
          app
          color="primary"
          dark
      >
        <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="toggleDrawer" />
        <v-toolbar-title class="ml-0 pl-4">Inventree</v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link :to="{ name: 'home' }">
          <v-btn color="primary" depressed>
            <v-icon class="mr-1">mdi-home</v-icon>
            Home
          </v-btn>
        </router-link>

        <v-menu v-if="authed" v-model="profileMenu" open-on-hover>
          <template v-slot:activator="{ on }">
            <v-avatar class="ml-4" v-on="on">
              <v-img :src="user.picture"></v-img>
            </v-avatar>
          </template>

          <v-list dense nav>
            <v-list-item v-if="authed" class="px-2">
              <v-list-item-avatar>
                <v-img :src="user.picture"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item to="/profile" link color="secondary">
              <v-list-item-icon>
                <v-icon>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/settings" link color="secondary">
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout" link color="secondary">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn v-else color="primary" depressed @click="$auth.loginWithPopup">
          <v-icon class="mr-1">mdi-face</v-icon>
          Sign In
        </v-btn>
      </v-app-bar>

      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import ConnectionHandler from './components/ConnectionHandler';
  import { A_LOGIN, A_LOGOUT } from './store/actions.type';
  import { M_TOGGLE_DRAWER } from './store/mutations.type';

  export default {
    name: 'App',
    components: { ConnectionHandler },
    data: () => ({
      profileMenu: false,
      loading: true
    }),
    beforeCreate() {
      this.$auth.$watch('loading', loading => {
        if (!loading && !this.$auth.user) this.loading = false;
      });
      this.$auth.$watch('user', user => {
        if (user) {
          this.$store.dispatch(A_LOGIN, user)
              .then(() => this.loading = false);
        }
      });
    },
    sockets: {
      setUser(user) {
        this.$vuetify.theme.dark = user.darkMode;
      }
    },
    computed: mapGetters(['user', 'authed']),
    methods: {
      async logout() {
        this.$store.dispatch(A_LOGOUT)
            .then(() => this.$auth.logout());
      },
      toggleDrawer() {
        this.$store.commit(M_TOGGLE_DRAWER);
      }
    }
  };
</script>

<style>
  .loading-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .action-card:hover .img-overlay {
    visibility: visible;
  }

  .img-overlay {
    visibility: hidden;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.75);
  }
</style>
