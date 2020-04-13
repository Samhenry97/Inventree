<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
  >
    {{ message }}
    <v-btn text @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'Snackbar',
    data: () => ({
      snackbar: false,
      message: '',
      color: 'info',
      timeout: 4000
    }),
    methods: {
      open(message, color='info') {
        this.snackbar = false;
        this.$nextTick(() => {
          this.message = message;
          this.color = color;
          this.snackbar = true;
        });
      },
      success(message) {
        this.timeout = 4000;
        this.open(message, 'success');
      },
      error(message) {
        this.timeout = 0;
        this.open(message, 'error');
      }
    }
  };
</script>

<style scoped>

</style>
