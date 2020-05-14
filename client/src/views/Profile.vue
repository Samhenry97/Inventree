<template>
  <v-content id="profile">
    <div class="pa-4">
      <p class="display-1 mb-0">Edit Profile</p>
      <v-divider class="my-2"></v-divider>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editUser.name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editUser.nickname" label="Nickname"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editUser.email" label="Email"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editUser.picture" label="Picture"></v-text-field>
        </v-col>
      </v-row>

      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save">
          <v-icon class="mr-2">mdi-content-save</v-icon>
          Save
        </v-btn>
      </div>
    </div>
  </v-content>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { A_UPDATE_USER } from '../store/actions.type';

  export default {
    name: 'Profile',
    data: () => ({
      editUser: {}
    }),
    computed: {
      ...mapGetters(['user'])
    },
    created() {
      this.editUser = { ...this.user };
    },
    methods: {
      save() {
        this.$store.dispatch(A_UPDATE_USER, this.editUser);
      }
    }
  };
</script>

<style scoped>

</style>
