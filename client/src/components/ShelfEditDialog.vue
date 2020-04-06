<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>{{ add ? 'New' : 'Edit' }} Shelf</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="editShelf.name" label="Name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-color-picker :value="editShelf.color" @update:color="editShelf.color = $event.hex">Color</v-color-picker>
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
  import Shelf from '../models/shelf';

  export default {
    name: 'ShelfEditDialog',
    props: {
      shelf: Object,
      type: String
    },
    data: () => ({
      dialog: false,
      editShelf: {}
    }),
    watch: {
      shelf() {
        if (this.shelf) {
          this.editShelf = { ...this.shelf };
        } else {
          this.editShelf = { ...Shelf.defaultModel, type: this.type };
        }
      }
    },
    computed: {
      add() {
        return !this.shelf;
      }
    },
    methods: {
      open() {
        this.dialog = true;
      },
      save() {
        const command = this.add ? 'createShelf' : 'updateShelf';
        this.$socket.emit(command, this.editShelf);
        this.dialog = false;
      },
    }
  };
</script>

<style scoped>

</style>
