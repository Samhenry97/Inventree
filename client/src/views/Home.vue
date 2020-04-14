<template>
  <div id="home">
    <div v-if="!authed">
      <p class="display-1">Welcome to Inventree!</p>
    </div>

    <div v-else>
      <div class="d-flex align-center">
        <p class="display-1 mb-0">My Types</p>
        <v-spacer></v-spacer>
        <v-btn color="secondary">
          <v-icon class="mr-2">mdi-plus</v-icon>
          Add Type
        </v-btn>
      </div>

      <v-divider class="my-2"></v-divider>

      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3">
          <TypeCard :type="{ name: 'Books' }" @click="$router.push({ name: 'books' })"></TypeCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import TypeCard from '../components/types/TypeCard';

  export default {
    name: 'Home',
    components: { TypeCard },
    computed: {
      ...mapGetters(['authed'])
    }
  };
</script>

<style scoped>

</style>
