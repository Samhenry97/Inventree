<template>
  <div id="books-dashboard">
    <BookEditDialog ref="editDialog" :book="editBook"></BookEditDialog>

    <div class="d-flex align-center">
      <p class="display-1">My Library</p>
      <v-spacer></v-spacer>
      <v-btn-toggle class="mr-2" v-model="cards" mandatory dense>
        <v-btn text color="secondary">
          <v-icon class="mr-2" color="secondary">mdi-card</v-icon>
          Cards
        </v-btn>
        <v-btn text color="secondary">
          <v-icon class="mr-2" color="secondary">mdi-table</v-icon>
          Table
        </v-btn>
      </v-btn-toggle>
      <router-link :to="{ name: 'bookadd' }">
        <v-btn color="secondary">
          <v-icon class="mr-2">mdi-plus</v-icon>
          Add Book
        </v-btn>
      </router-link>
    </div>

    <v-divider class="mb-2"></v-divider>

    <v-row v-if="cards === 0">
      <v-col v-for="book of books" :key="book._id" cols="12" sm="6" md="4" lg="3">
        <BookCard @click="edit(book)" :book="book" :edit="edit" :remove="remove"></BookCard>
      </v-col>
    </v-row>

    <div v-else>
      <div v-if="selected.length > 0" class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn color="error" class="mr-2" @click="removeSelected">
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete Selected
        </v-btn>
        <v-btn color="secondary" @click="editSelected">
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Selected
        </v-btn>
      </div>
      <v-data-table
          @click:row="edit"
          v-model="selected"
          show-select
          :headers="headers"
          :items="books"
          :items-per-page="12"
          :loading="loading"
          item-key="_id"
          class="elevation-2 mt-2"
      >
        <template v-slot:item.shelf="{ item }">
          {{ Shelf.getById('book', item.shelf).name }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookEditDialog from '../../components/books/BookEditDialog';
import BookCard from '../../components/books/BookCard';
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
    selected: [],
    cards: 0,
    loading: false,
    editBook: null,
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
    },
    editSelected() {
      // TODO batch edit
    },
    removeSelected() {
      this.loading = true;
      const ids = this.selected.map(book => book._id);
      this.$socket.emit('deleteManyBooks', ids, () => this.loading = false);
    }
  }
};
</script>

<style scoped>

</style>
