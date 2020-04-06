<template>
  <div id="books-dashboard">
    <BookEditDialog ref="editDialog" :book="editBook"></BookEditDialog>

    <div class="d-flex align-center">
      <p class="display-1">My Library</p>
      <v-spacer></v-spacer>
      <v-btn-toggle class="mr-2" v-model="cards" mandatory dense>
        <v-btn text color="secondary">
          Cards
        </v-btn>
        <v-btn text color="secondary">
          Table
        </v-btn>
      </v-btn-toggle>
      <router-link :to="{ name: 'bookadd' }">
        <v-btn color="secondary">
          <v-icon>mdi-plus</v-icon>
          Add Book
        </v-btn>
      </router-link>
    </div>

    <v-row v-if="cards === 0">
      <v-col v-for="book of books" :key="book._id" cols="12" sm="6" md="4" lg="3">
        <BookCard :book="book" :edit="edit" :remove="remove"></BookCard>
      </v-col>
    </v-row>

    <v-data-table
        v-else
        @click:row="edit"
        show-select
        :headers="headers"
        :items="books"
        :items-per-page="12"
        class="elevation-2"
    >
      <template v-slot:item.shelf="{ item }">
        {{ Shelf.getById('book', item.shelf).name }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookEditDialog from '../../components/BookEditDialog';
import BookCard from '../../components/BookCard';
import Shelf from '../../models/shelf';

export default {
  name: 'BooksDashboard',
  data: () => ({
    headers: [
      {
        text: 'Shelf',
        value: 'shelf'
      },
      {
        text: 'Title',
        value: 'title'
      },
      {
        text: 'Subtitle',
        value: 'subtitle'
      },
      {
        text: 'Author',
        value: 'author'
      },
      {
        text: 'ISBN 10',
        value: 'isbn10'
      },
      {
        text: 'ISBN 13',
        value: 'isbn13'
      }
    ],
    cards: 0,
    editBook: {},
    Shelf
  }),
  components: {
    BookCard,
    BookEditDialog
  },
  computed: {
    ...mapGetters(['books'])
  },
  methods: {
    edit(book) {
      this.editBook = book;
      this.$refs.editDialog.open();
    },
    remove(book) {
      if (confirm('Are you sure you want to delete this book?')) {
        this.$socket.emit('deleteBook', book);
      }
    }
  }
};
</script>

<style scoped>

</style>
