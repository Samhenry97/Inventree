<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Shelf`" @save="save">
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
  </EditDialog>
</template>

<script>
  import Shelf from '../../models/shelf';
  import EditDialog from '../EditDialog';

  export default {
    name: 'ShelfEditDialog',
    components: { EditDialog },
    props: {
      shelf: Object,
      type: String
    },
    data: () => ({
      editShelf: {}
    }),
    computed: {
      add() {
        return !this.shelf;
      }
    },
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? 'createShelf' : 'updateShelf';
        this.$socket.emit(command, this.editShelf);
        this.$refs.dialog.close();
      },
      reset() {
        if (this.shelf) {
          this.editShelf = { ...this.shelf };
        } else {
          this.editShelf = { ...Shelf.defaultModel, type: this.type };
        }
      }
    }
  };
</script>

<style scoped>

</style>
