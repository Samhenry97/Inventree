<template>
  <div id="shelves-dashboard">
    <ShelfEditDialog ref="editDialog" :shelf="editShelf" :type="type"></ShelfEditDialog>
    <v-dialog v-model="moveDialog" max-width="600px">
      <v-card>
        <v-card-title>Move Books</v-card-title>

        <v-card-text>
          <p>You still have {{ moveCount }} book(s) left in this shelf.</p>
          <p>Choose a new shelf for your books:</p>
          <v-select
              v-model="moveShelf"
              :items="moveShelves"
              label="Move to shelf..."
              item-text="name"
              item-value="_id"
          ></v-select>

          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn text @click="moveDialog = false">Close</v-btn>
            <v-btn color="error" text @click="performMove">Delete</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="d-flex align-center">
      <p class="display-1">My Shelves</p>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="add">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Add Shelf
      </v-btn>
    </div>

    <v-divider class="mb-2"></v-divider>

    <v-row v-if="cards === 0">
      <v-col v-for="shelf of shelves" :key="shelf._id" cols="12" sm="6" md="4" lg="3">
        <ShelfCard :shelf="shelf" :edit="edit" :remove="remove"></ShelfCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ShelfCard from '../../components/ShelfCard';
  import ShelfEditDialog from '../../components/ShelfEditDialog';
  import Shelf from '../../models/shelf';

  export default {
    name: 'ShelvesDashboard',
    props: {
      type: String
    },
    data: () => ({
      cards: 0,
      editShelf: null,
      deleteShelf: null,
      moveCount: 0,
      moveShelves: [],
      moveShelf: '',
      moveDialog: false
    }),
    components: {
      ShelfEditDialog,
      ShelfCard
    },
    computed: {
      ...mapState({
        allShelves: state => state.shelves
      }),
      shelves() {
        return this.allShelves[this.type];
      }
    },
    methods: {
      add() {
        this.editShelf = null;
        this.$refs.editDialog.open();
      },
      edit(shelf) {
        this.editShelf = shelf;
        this.$refs.editDialog.open();
      },
      remove(shelf) {
        this.deleteShelf = shelf;
        this.moveCount = Shelf.itemCount(shelf);
        this.moveShelves = Shelf.allBut(shelf);
        this.moveShelf = this.moveShelves[0]._id;
        if (this.shelves.length === 1) {
          alert('You cannot delete the last shelf in your library.');
        } else if(this.moveCount > 0) {
          this.moveDialog = true;
        } else if(confirm('Are you sure you want to delete this shelf?')) {
          this.$socket.emit('deleteShelf', shelf);
        }
      },
      performMove() {
        this.moveDialog = false;
        this.$socket.emit('deleteShelf', this.deleteShelf, this.moveShelf);
      }
    }
  };
</script>

<style scoped>

</style>
