<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>{{ add ? 'New' : 'Edit' }} Book</v-card-title>

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
          <v-col cols="12">
            <v-combobox
                v-model="editBook.tags"
                :items="tags"
                :search-input.sync="tagSearch"
                :disabled="tagsDisabled"
                :loading="tagsDisabled"
                item-text="name"
                item-value="_id"
                label="Tags"
                multiple
                small-chips
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching "<strong>{{ tagSearch }}</strong>". Press <kbd>enter</kbd> to create a new tag.
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-slot:selection="data">
                <v-chip
                  :key="data.item._id"
                  :input-value="data.item.name"
                  v-bind="data.attrs"
                  :disabled="data.disabled"
                >
                  <v-avatar
                    class="secondary white--text"
                    left
                    v-text="data.item.name[0].toUpperCase()"
                  ></v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12">
            <v-textarea
                v-model="editBook.description"
                label="Description"
                auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState } from 'vuex';
  import Book from '../../models/book';
  import Tag from '../../models/tag';

  export default {
    name: 'BookEditDialog',
    watch: {
      'editBook.tags' (val) {
        // We need to create new tags and update with the created one
        const newTags = val.filter(tag => typeof tag === 'string');
        if (newTags.length > 0) {
          this.tagsDisabled = true;
          this.editBook.tags = val.filter(tag => typeof tag !== 'string');
          newTags.forEach(tag => {
            if (Tag.exists({ name: tag, type: 'book' })) {
              this.editBook.tags.push(Tag.getByName('book', tag));
              this.tagsDisabled = false;
            } else {
              this.$socket.emit('createTag', { name: tag, type: 'book' }, result => {
                this.editBook.tags.push(result);
                this.tagsDisabled = false;
              });
            }
          });
        }
      }
    },
    computed: {
      ...mapState({
        shelves: state => state.shelves.book,
        tags: state => state.tags.book
      }),
      add() {
        return !this.editBook._id;
      }
    },
    sockets: {
      updateItem({ type, updated }) {
        if (type === 'book' && this.editBook && this.editBook._id === updated._id) {
          this.editBook = this.normalizeBook(updated);
        }
      }
    },
    data: () => ({
      dialog: false,
      editBook: { tags: [] },
      tagSearch: '',
      tagsDisabled: false,
      Tag
    }),
    methods: {
      normalizeBook(book) {
        return {
          ...book,
          tags: book.tags.map(id => Tag.getById('book', id))
        }
      },
      open(book) {
        if (book) {
          this.editBook = this.normalizeBook(book);
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
