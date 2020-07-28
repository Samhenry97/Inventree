<template>
  <v-card hover ripple @click="$emit('click')">
    <v-card-title>{{ type.name }}</v-card-title>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="$emit('edit', type)">Edit</v-btn>
      <v-btn color="error" text @click.stop="$emit('remove', type)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'TypeCard',
    props: {
      type: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>
