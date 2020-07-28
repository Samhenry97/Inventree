<template>
  <v-sheet
      dark
      elevation="2"
      :color="mine ?
      'secondary' : 'grey'"
      class="message pa-2 ma-1"
      :class="{ 'align-self-start': !mine, 'align-self-end': mine }"
  >
    <v-avatar></v-avatar>
    {{ message.content }}
  </v-sheet>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Message',
    props: {
      message: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters(['user']),
      mine() {
        return this.message.user === this.user._id;
      }
    }
  };
</script>

<style scoped>
.message {
  max-width: 50%;
}
</style>
