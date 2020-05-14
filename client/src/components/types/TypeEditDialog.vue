<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Type`" @save="save">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editType.name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
              v-model="editType.preset"
              :items="['book']"
              clearable
              label="Preset"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="editType.description" label="Description"></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
  </EditDialog>
</template>

<script>
  import EditDialog from '../EditDialog';
  import { A_CREATE_TYPE, A_UPDATE_TYPE } from '../../store/actions.type';
  import { defaultModel } from '../../store/types.module';

  export default {
    name: 'TypeEditDialog',
    components: { EditDialog },
    props: {
      type: Object,
      container: Object
    },
    computed: {
      add() {
        return !this.editType._id;
      }
    },
    data: () => ({
      editType: {}
    }),
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      reset() {
        if (this.type) {
          this.editType = { ...this.type };
        } else {
          this.editType = { ...defaultModel, container: this.container._id };
        }
      },
      save() {
        const command = this.add ? A_CREATE_TYPE : A_UPDATE_TYPE;
        this.$store.dispatch(command, this.editType)
            .then(() => this.$refs.dialog.close());
      }
    }
  };
</script>

<style scoped>

</style>
