<template>
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
</template>

<script>
  import { mapGetters } from 'vuex';
  import { A_LOGOUT } from '../store/actions.type';

  export default {
    name: 'AppBarOptions',
    computed: mapGetters(['user', 'authed']),
    methods: {
      logout() {
        this.$store.dispatch(A_LOGOUT)
            .then(() => this.$auth.logout());
      }
    }
  };
</script>
