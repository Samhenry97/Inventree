<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 4 : 2">
      <v-img height="256px" :src="book.smallThumbnail"></v-img>
      <v-card-title>{{ book.title }}</v-card-title>
      <v-card-subtitle>{{ book.author }}</v-card-subtitle>
      <v-card-text>
        <v-rating
            v-model="book.rating"
            readonly
            half-increments
            empty-icon="mdi-heart-outline"
            half-icon="mdi-heart-half-full"
            full-icon="mdi-heart"
            color="red"
            background-color="grey"
        ></v-rating>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn text @click="edit(book)">Edit</v-btn>
        <v-btn color="error" text @click="remove(book)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    name: 'BookCard',
    props: {
      book: Object,
      edit: Function,
      remove: Function
    }
  };
</script>

<style scoped>

</style>
