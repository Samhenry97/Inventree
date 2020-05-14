<template>
  <v-content id="user-profile">
    <div class="pa-4">
      <div v-if="profile">
        <div class="d-flex align-center">
          <p class="display-1 mb-0">{{ profile.name }}'s Profile</p>
          <v-spacer></v-spacer>
          <v-btn v-if="following" color="secondary" @click="toggleFollow">
            <v-icon class="mr-2">mdi-account-check</v-icon>
            Following
          </v-btn>
          <v-btn v-else color="secondary" @click="toggleFollow">
            <v-icon class="mr-2">mdi-account-plus</v-icon>
            Follow
          </v-btn>
        </div>
        <v-divider class="my-2"></v-divider>

        <v-row>
          <v-col cols="12">
            <v-avatar size="128">
              <v-img :src="profile.picture"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="6">
            <v-label>Name</v-label>
            <p>{{ profile.name }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <v-label>Nickname</v-label>
            <p>{{ profile.nickname }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <v-label>Email</v-label>
            <p>{{ profile.email }}</p>
          </v-col>
        </v-row>
      </div>
      <v-row v-else>

      </v-row>
    </div>
  </v-content>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { A_ADD_FRIEND, A_DELETE_FRIEND, A_FETCH_USER } from '../../store/actions.type';

  export default {
    name: 'UserProfile',
    data: () => ({
      profile: null
    }),
    mounted() {
      this.$store.dispatch(A_FETCH_USER, this.$route.params.user)
          .then(profile => this.profile = profile);
    },
    beforeRouteUpdate(to, from, next) {
      this.profile = null;
      this.$store.dispatch(A_FETCH_USER, to.params.user)
          .then(profile => this.profile = profile);
      next();
    },
    computed: {
      ...mapGetters(['user']),
      following() {
        if (this.profile) {
          return this.user.friends.includes(this.profile._id);
        }
        return false;
      }
    },
    methods: {
      toggleFollow() {
        if (this.following) {
          if (confirm('Are you sure you want to remove this friend?')) {
            this.$store.dispatch(A_DELETE_FRIEND, this.profile._id);
          }
        } else {
          this.$store.dispatch(A_ADD_FRIEND, this.profile._id);
        }
      }
    }
  };
</script>
