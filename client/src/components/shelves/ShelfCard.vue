<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 4 : 2">
      <v-card-title>{{ shelf.name }}</v-card-title>
      <v-card-subtitle>
        <div class="color" :style="colorStyle"></div>
      </v-card-subtitle>
      <v-card-actions class="pt-0">
        <v-btn text @click="edit(shelf)">Edit</v-btn>
        <v-btn color="error" text @click="remove(shelf)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: 'ShelfCard',
    props: {
      shelf: Object,
      edit: Function,
      remove: Function
    },
    computed: {
      colorStyle() {
        return { backgroundColor: this.shelf.color }
      }
    }
  };
</script>

<style scoped>
.color {
  height: 12px;
  border-radius: 8px;
  border: 1px solid black;
}
</style>
