<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Book`" @save="save">
    <v-divider></v-divider>

    <v-tabs
        v-model="tab"
        grow
        dark
        background-color="secondary"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#main">
        Book
      </v-tab>
      <v-tab href="#checkouts">
        Checkouts
      </v-tab>

      <v-tab-item value="main">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                  :items="shelves"
                  v-model="editBook.shelves"
                  label="Shelf"
                  item-text="name"
                  item-value="_id"
                  multiple
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
              <TagSelector :value="editBook.tags" @change="editBook.tags = $event" type="book"></TagSelector>
            </v-col>
            <v-col cols="12">
              <v-textarea
                  v-model="editBook.description"
                  label="Description"
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
      </v-tab-item>

      <v-tab-item value="checkouts">
        <v-card-text>
          <CheckoutsDashboard :book="editBook"></CheckoutsDashboard>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </EditDialog>
</template>

<script>
  import { mapState } from 'vuex';
  import TagSelector from '../tags/TagSelector';
  import CheckoutsDashboard from '../../views/checkouts/CheckoutsDashboard';
  import EditDialog from '../EditDialog';
  import { defaultModel } from '../../store/books.module';
  import { A_CREATE_ITEM, A_UPDATE_ITEM } from '../../store/actions.type';

  export default {
    name: 'BookEditDialog',
    components: { EditDialog, CheckoutsDashboard, TagSelector },
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
    props: {
      book: Object
    },
    data: () => ({
      dialog: false,
      editBook: { tags: [] },
      tagSearch: '',
      tagsDisabled: false,
      tab: null
    }),
    watch: {
      book() {
        this.reset();
      }
    },
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? A_CREATE_ITEM : A_UPDATE_ITEM;
        this.$store.dispatch(command, { type: 'book', item: this.editBook })
            .then(() => this.$refs.dialog.close());
      },
      reset() {
        this.tab = 'main';
        if (this.book) {
          this.editBook = { ...this.book };
        } else {
          this.editBook = { ...defaultModel };
        }
      }
    }
  };
</script>

<style scoped>

</style>
