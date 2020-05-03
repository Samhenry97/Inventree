<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Shelf`" @save="save">
    <v-divider></v-divider>

    <v-tabs
        v-model="tab"
        grow
        dark
        background-color="secondary"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#main">
        Shelf
      </v-tab>
      <v-tab href="#checkouts">
        {{ type.name }}
      </v-tab>

      <v-tab-item value="main">
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
      </v-tab-item>

      <v-tab-item value="checkouts">
        <v-card-text>
          <ShelfItems :shelf="editShelf"></ShelfItems>
        </v-card-text>
      </v-tab-item>
    </v-tabs>
  </EditDialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EditDialog from '../EditDialog';
  import ShelfItems from './ShelfItems';
  import { defaultModel } from '../../store/shelves.module';
  import { A_CREATE_SHELF, A_UPDATE_SHELF } from '../../store/actions.type';

  export default {
    name: 'ShelfEditDialog',
    components: { EditDialog, ShelfItems },
    props: {
      shelf: Object
    },
    data: () => ({
      editShelf: {},
      tab: null
    }),
    computed: {
      ...mapGetters(['type']),
      add() {
        return !this.shelf;
      }
    },
    watch: {
      shelf() {
        this.reset();
      }
    },
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? A_CREATE_SHELF : A_UPDATE_SHELF;
        this.$store.dispatch(command, this.editShelf)
            .then(() => this.$refs.dialog.close());
      },
      reset() {
        if (this.shelf) {
          this.editShelf = { ...this.shelf };
        } else {
          this.editShelf = { ...defaultModel, type: this.type._id };
        }
      }
    }
  };
</script>

<style scoped>

</style>
