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
        <p class="display-3">Inventree</p>
      </div>
    </div>

    <template v-else>
      <AppBar></AppBar>

      <router-view></router-view>

      <v-footer app>&copy; Samuel Henry {{ new Date().getFullYear() }}</v-footer>
    </template>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import ConnectionHandler from './components/ConnectionHandler';
  import { A_LOGIN } from './store/actions.type';
  import AppBar from './components/AppBar';
  import { M_SET_LOADING } from './store/mutations.type';

  export default {
    name: 'App',
    components: { AppBar, ConnectionHandler },
    beforeCreate() {
      this.$auth.$watch('loading', loading => {
        if (!loading && !this.$auth.user) {
          this.$store.commit(M_SET_LOADING, false);
        }
      });
      this.$auth.$watch('user', user => {
        if (user) {
          this.$store.dispatch(A_LOGIN, user);
        }
      });
    },
    sockets: {
      setUser(user) {
        this.$vuetify.theme.dark = user.darkMode;
      }
    },
    computed: mapGetters(['user', 'authed', 'loading'])
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
