<template>
  <div id="bookadd">
    <BookEditDialog ref="editDialog" :book="editBook"></BookEditDialog>

    <div class="d-flex align-center">
      <p class="display-1">Add Books</p>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="addManually">
        Add Manually
      </v-btn>
    </div>

    <v-form
        ref="search"
        v-model="validSearch"
        @submit.prevent="performSearch"
    >
      <div class="row">
        <div class="col">
          <v-select
              :items="shelves"
              label="Choose shelf..."
              v-model="shelf"
              item-text="name"
              item-value="_id"
          ></v-select>
        </div>
      </div>
      <div class="d-flex align-center">
        <v-select
            class="mr-4 flex-grow-0"
            :items="searchTypes"
            v-model="searchType"
            label="Search for..."
        ></v-select>
        <v-text-field
            class="mr-4"
            v-model="query"
            label="Search"
            clearable
            :rules="[v => !!v || 'This field is required']"
            :loading="loading"
            required
        ></v-text-field>
        <v-btn
            color="secondary"
            type="submit"
        >Search</v-btn>
      </div>
    </v-form>

    <div v-if="results.length > 0">
      <v-row>
        <v-col v-for="book in results" :key="book.fromid" cols="12" sm="6" md="4" lg="3">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 4 : 2">
              <v-img height="256px" :src="book.smallThumbnail"></v-img>
              <v-card-title>{{ book.title }}</v-card-title>
              <v-card-subtitle>{{ book.author }}</v-card-subtitle>
              <v-card-actions>
                <v-btn v-if="!Book.exists(book)" color="success" text @click="add(book)">Add</v-btn>
                <v-btn v-else color="error" text @click="remove(book)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-pagination
          v-model="page"
          :length="numPages"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import Book from '../../models/book';
  import BookEditDialog from '../../components/BookEditDialog';

  export default {
    name: 'BookAdd',
    components: { BookEditDialog },
    data: () => ({
      validSearch: true,
      searchTypes: [
        { text: 'Anything', value: '' },
        { text: 'Title', value: 'intitle:' },
        { text: 'Author', value: 'inauthor:' },
        { text: 'ISBN', value: 'isbn:' }
      ],
      shelf: '',
      searchType: '',
      queryTimeout: null,
      query: '',
      currentQuery: '',
      loading: false,
      results: [],
      totalResults: 0,
      page: 1,
      resultsPerPage: 12,
      resultsPerPageOptions: [4, 8, 12, 16],
      editBook: {},
      Book
    }),
    computed: {
      numPages() {
        return Math.ceil(this.totalResults / this.resultsPerPage);
      },
      ...mapGetters(['books']),
      ...mapState({
        shelves: state => state.shelves.book
      })
    },
    watch: {
      page: function() {
        this.performSearch();
      }
    },
    created() {
      this.shelf = this.shelves[0]._id;
    },
    methods: {
      add(book) {
        this.$socket.emit('createBook', { ...book, shelf: this.shelf });
      },
      remove(book) {
        if (confirm('Are you sure you want to delete this book?')) {
          const storeBook = Book.getByISBN(book);
          this.$socket.emit('deleteBook', storeBook);
        }
      },
      performSearch() {
        this.$refs.search.validate();
        if (!this.validSearch) return;

        this.loading = true;
        const query = {
          q: `${this.searchType}${this.query}`,
          maxResults: this.resultsPerPage,
          startIndex: (this.page - 1) * this.resultsPerPage
        };
        this.$socket.emit('searchBooks', query, data => {
          this.results = data.books;
          this.totalResults = data.totalBooks;
          this.loading = false;
        });
      },
      addManually() {
        this.editBook = null;
        this.$refs.editDialog.open();
      }
    }
  };
</script>

<style scoped>

</style>
