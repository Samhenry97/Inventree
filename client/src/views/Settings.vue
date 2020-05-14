<template>
  <v-content id="settings">
    <div class="pa-4">
      <p class="display-1 mb-0">Edit Settings</p>
      <v-divider class="my-2"></v-divider>

      <v-switch @change="toggleDarkMode" :input-value="$vuetify.theme.dark" label="Dark Mode"></v-switch>
    </div>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex';
import { A_UPDATE_USER } from '../store/actions.type';

export default {
  name: 'Settings',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    toggleDarkMode() {
      const darkMode = !this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = darkMode;
      if (this.user) this.$store.dispatch(A_UPDATE_USER, { ...this.user, darkMode });
    }
  }
};
</script>

<style scoped>

</style>
