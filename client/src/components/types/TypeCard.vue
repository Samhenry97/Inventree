<template>
  <v-card hover ripple shaped @click="$emit('click')">
    <v-card-title>{{ type.name }}</v-card-title>
    <v-card-actions v-if="editable" class="pt-0">
      <v-btn text @click.stop="edit(shelf)">Edit</v-btn>
      <v-btn color="error" text @click.stop="remove(shelf)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'TypeCard',
    props: {
      type: Object,
      editable: Boolean,
      edit: Function,
      remove: Function
    }
  };
</script>

<style scoped>

</style>
