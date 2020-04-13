<template>
  <v-row>
    <v-col v-for="i in 12" :key="i" cols="12" sm="6" md="4" lg="3">
      <v-skeleton-loader type="card"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Skeleton'
  };
</script>

<style scoped>

</style>
