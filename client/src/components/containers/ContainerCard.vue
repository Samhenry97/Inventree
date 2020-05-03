<template>
  <v-card hover ripple shaped @click="$emit('click')">
    <v-card-title>{{ container.name }}</v-card-title>
    <v-card-subtitle>{{ container.path }}</v-card-subtitle>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="edit(container)">Edit</v-btn>
      <v-btn color="error" text @click.stop="remove(container)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'ContainerCard',
    props: {
      container: {
        type: Object,
        required: true
      },
      edit: {
        type: Function,
        required: true
      },
      remove: {
        type: Function,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>
