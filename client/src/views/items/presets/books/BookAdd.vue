<template>
  <div id="book-add">
    <ItemEditDialog ref="editDialog" :item="editItem"></ItemEditDialog>

    <div class="d-flex align-center">
      <p class="display-1 mb-0">Add {{ type.name }}</p>
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
          <TagSelector v-model="tags"></TagSelector>
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
          <v-card hover ripple shaped @click="add(book)">
            <v-img height="192px" :src="book.smallThumbnail"></v-img>
            <v-card-title>{{ book.title }}</v-card-title>
            <v-card-subtitle>{{ book.author }}</v-card-subtitle>
            <v-card-actions>
              <v-btn v-if="!bookByIsbn(book)" color="success" text @click.stop="add(book)">Add</v-btn>
              <v-btn v-else color="error" text @click.stop="remove(book)">Delete</v-btn>
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
  import { mapGetters } from 'vuex';
  import TagSelector from '../../../../components/tags/TagSelector';
  import { A_CREATE_ITEM, A_DELETE_ITEM, A_SEARCH_BOOKS } from '../../../../store/actions.type';
  import ItemEditDialog from '../../../../components/items/ItemEditDialog';

  export default {
    name: 'BookAdd',
    components: { ItemEditDialog, TagSelector },
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
      editItem: null
    }),
    computed: {
      numPages() {
        return Math.ceil(this.totalResults / this.resultsPerPage);
      },
      ...mapGetters({
        itemFindOne: 'itemFindOne',
        allShelves: 'shelves',
        type: 'type'
      })
    },
    watch: {
      page: function() {
        this.performSearch();
      }
    },
    methods: {
      add(book) {
        book = {
          ...book,
          type: this.type._id,
          shelves: this.shelves,
          tags: this.tags
        };
        this.$store.dispatch(A_CREATE_ITEM, book);
      },
      remove(book) {
        if (confirm('Are you sure you want to delete this book?')) {
          const storeBook = this.bookByIsbn(book);
          this.$store.dispatch(A_DELETE_ITEM, storeBook);
        }
      },
      bookByIsbn(book) {
        const query = {};
        if (book.isbn10) query.isbn10 = book.isbn10;
        if (book.isbn13) query.isbn13 = book.isbn13;
        return this.itemFindOne(query);
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
        this.editItem = null;
        this.$refs.editDialog.open();
      }
    }
  };
</script>

<style scoped>

</style>
