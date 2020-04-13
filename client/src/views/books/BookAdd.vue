<template>
  <div id="bookadd">
    <BookEditDialog ref="editDialog" :book="editBook"></BookEditDialog>

    <div class="d-flex align-center">
      <p class="display-1 mb-0">Add Books</p>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="addManually">
        <v-icon class="mr-2">mdi-clipboard-text</v-icon>
        Add Manually
      </v-btn>
    </div>

    <v-divider class="my-2"></v-divider>

    <v-form
        ref="search"
        v-model="validSearch"
        @submit.prevent="performSearch"
    >
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
              :items="allShelves"
              v-model="shelves"
              label="Shelves"
              item-text="name"
              item-value="_id"
              multiple
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <TagSelector :value="tags" @change="tags = $event" type="book"></TagSelector>
        </v-col>
      </v-row>
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
        >
          <v-icon class="mr-2">mdi-magnify</v-icon>
          Search
        </v-btn>
      </div>
    </v-form>

    <div v-if="results.length > 0">
      <v-row>
        <v-col v-for="book in results" :key="book.fromid" cols="12" sm="6" md="4" lg="3">
          <v-card hover ripple shaped>
            <v-img height="192px" :src="book.smallThumbnail"></v-img>
            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-subtitle>{{ book.author }}</v-card-subtitle>
            <v-card-actions>
              <v-btn v-if="!bookByIsbn(book)" color="success" text @click="add(book)">Add</v-btn>
              <v-btn v-else color="error" text @click="remove(book)">Delete</v-btn>
            </v-card-actions>
          </v-card>
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
  import BookEditDialog from '../../components/books/BookEditDialog';
  import TagSelector from '../../components/tags/TagSelector';
  import { A_CREATE_ITEM, A_DELETE_ITEM, A_SEARCH_BOOKS } from '../../store/actions.type';

  export default {
    name: 'BookAdd',
    components: { TagSelector, BookEditDialog },
    data: () => ({
      validSearch: true,
      searchTypes: [
        { text: 'Anything', value: '' },
        { text: 'Title', value: 'intitle:' },
        { text: 'Author', value: 'inauthor:' },
        { text: 'ISBN', value: 'isbn:' }
      ],
      shelves: [],
      tags: [],
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
      editBook: {}
    }),
    computed: {
      numPages() {
        return Math.ceil(this.totalResults / this.resultsPerPage);
      },
      ...mapGetters(['books', 'itemFindOne']),
      ...mapState({
        allShelves: state => state.shelves.book
      })
    },
    watch: {
      page: function() {
        this.performSearch();
      }
    },
    methods: {
      add(book) {
        this.$store.dispatch(A_CREATE_ITEM, { type: 'book', item: { ...book, shelves: this.shelves, tags: this.tags } });
      },
      remove(book) {
        if (confirm('Are you sure you want to delete this book?')) {
          const storeBook = this.bookByIsbn(book);
          this.$store.dispatch(A_DELETE_ITEM, { type: 'book', item: storeBook });
        }
      },
      bookByIsbn(book) {
        const query = {};
        if (book.isbn10) query.isbn10 = book.isbn10;
        if (book.isbn13) query.isbn13 = book.isbn13;
        return this.itemFindOne('book', query);
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
        this.$store.dispatch(A_SEARCH_BOOKS, query)
            .then(data => {
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
