<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Container`" @save="save">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editContainer.name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editContainer.path" label="Path"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="editContainer.description" label="Description"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </EditDialog>
</template>

<script>
  import EditDialog from '../EditDialog';
  import { A_CREATE_CONTAINER, A_UPDATE_CONTAINER } from '../../store/actions.type';
  import { defaultModel } from '../../store/containers.module';

  export default {
    name: 'ContainerEditDialog',
    components: { EditDialog },
    props: {
      container: Object
    },
    computed: {
      add() {
        return !this.editContainer._id;
      }
    },
    data: () => ({
      editContainer: {}
    }),
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? A_CREATE_CONTAINER : A_UPDATE_CONTAINER;
        this.$store.dispatch(command, this.editContainer)
            .then(() => this.$refs.dialog.close());
      },
      reset() {
        if (this.container) {
          this.editContainer = { ...this.container };
        } else {
          this.editContainer = { ...defaultModel };
        }
      }
    }
  };
</script>

<style scoped>

</style>
