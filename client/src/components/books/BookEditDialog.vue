<template>
  <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="600px"
      persistent
  >
    <v-card>
      <v-toolbar dark color="secondary">
        <v-toolbar-title>{{ add ? 'New' : 'Edit' }} Book</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>
      
      <v-tabs
          v-model="tab"
          grow
          dark
          background-color="secondary"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#main">
          Main
        </v-tab>
        <v-tab href="#checkouts">
          Checkouts
        </v-tab>

        <v-tab-item value="main">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                    v-model="editBook.shelf"
                    label="Shelf"
                    :items="shelves"
                    item-text="name"
                    item-value="_id"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editBook.title" label="Title*" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editBook.subtitle" label="Subtitle"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editBook.author" label="Author"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editBook.isbn10" label="ISBN 10"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editBook.isbn13" label="ISBN 13"></v-text-field>
              </v-col>
              <v-col cols="12">
                <TagSelector :item="editBook" type="book"></TagSelector>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    v-model="editBook.description"
                    label="Description"
                    auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="auto" class="mx-auto">
                <v-rating
                    v-model="editBook.rating"
                    half-increments
                    hover
                    empty-icon="mdi-heart-outline"
                    half-icon="mdi-heart-half-full"
                    full-icon="mdi-heart"
                    color="red"
                    background-color="grey"
                ></v-rating>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">Close</v-btn>
            <v-btn color="primary" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-tab-item>

        <v-tab-item value="checkouts">
          Hi
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex';
  import Book from '../../models/book';
  import TagSelector from '../tags/TagSelector';

  export default {
    name: 'BookEditDialog',
    components: { TagSelector },
    computed: {
      ...mapState({
        shelves: state => state.shelves.book
      }),
      add() {
        return !this.editBook._id;
      }
    },
    sockets: {
      updateItem({ type, updated }) {
        if (type === 'book' && this.editBook && this.editBook._id === updated._id) {
          this.editBook = updated;
        }
      }
    },
    data: () => ({
      dialog: false,
      editBook: { tags: [] },
      book: {},
      tagSearch: '',
      tagsDisabled: false,
      tab: null
    }),
    methods: {
      open(book) {
        if (book) {
          this.editBook = { ...book };
        } else {
          this.editBook = { ...Book.defaultModel, shelf: this.shelves[0]._id };
        }
        this.dialog = true;
      },
      save() {
        const command = this.add ? 'createBook' : 'updateBook';
        this.$socket.emit(command, this.editBook);
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>
