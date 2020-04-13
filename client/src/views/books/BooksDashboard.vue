<template>
  <div id="books-dashboard">
    <BookEditDialog ref="editDialog" :book="editBook"></BookEditDialog>

    <div class="d-flex align-center">
      <p class="display-1 mb-0">My Books ({{ books.length }})</p>
      <v-spacer></v-spacer>
      <v-btn-toggle class="mr-2" v-model="cards" mandatory dense>
        <v-btn text color="secondary" :value="true">
          <v-icon class="mr-2" color="secondary">mdi-card</v-icon>
          Cards
        </v-btn>
        <v-btn text color="secondary" :value="false">
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

    <v-divider class="my-2"></v-divider>

    <CustomTable
        v-if="cards"
        :items="books"
        :sortOptions="sortOptions"
    >
      <template #default="{ items: books }">
        <v-row>
          <v-col v-for="book of books" :key="book._id" cols="12" sm="6" md="4" lg="3">
            <BookCard @click="edit(book)" :book="book" :edit="edit" :remove="remove"></BookCard>
          </v-col>
        </v-row>
      </template>

      <template #no-data>
        <p class="pa-4 text-center">No books here. <router-link :to="{ name: 'bookadd' }">Add</router-link> some to get started!</p>
      </template>
    </CustomTable>

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
        <template v-slot:item.shelves="{ item }">
          {{ shelfNames(item) }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookEditDialog from '../../components/books/BookEditDialog';
import BookCard from '../../components/books/BookCard';
import { A_DELETE_ITEM, A_DELETE_MANY_ITEMS } from '../../store/actions.type';
import CustomTable from '../../components/CustomTable';

export default {
  name: 'BooksDashboard',
  data: () => ({
    headers: [
      {
        text: 'Shelves',
        value: 'shelves'
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
    sortOptions: [
      { text: 'Title', value: 'title' },
      { text: 'Subtitle', value: 'subtitle' },
      { text: 'Author', value: 'author' }
    ],
    selected: [],
    cards: true,
    loading: false,
    editBook: null
  }),
  components: {
    CustomTable,
    BookCard,
    BookEditDialog
  },
  computed: {
    ...mapGetters(['books', 'shelfById'])
  },
  methods: {
    edit(book) {
      this.editBook = book;
      this.$refs.editDialog.open();
    },
    remove(book) {
      if (confirm('Are you sure you want to delete this book?')) {
        this.$store.dispatch(A_DELETE_ITEM, { type: 'book', item: book });
      }
    },
    editSelected() {
      // TODO batch edit
    },
    removeSelected() {
      if (confirm(`Are you sure you want to delete ${this.selected.length} books?`)) {
        this.loading = true;
        const ids = this.selected.map(book => book._id);
        this.$store.dispatch(A_DELETE_MANY_ITEMS, { type: 'book', ids })
            .then(() => this.loading = false);
      }
    },
    shelfNames(item) {
      const names = item.shelves.map(shelf => this.shelfById('book', shelf).name);
      return names.join(', ');
    }
  }
};
</script>

<style scoped>

</style>
