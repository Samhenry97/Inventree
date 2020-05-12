<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Field`" @save="save">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="editField.name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
              label="Type"
              :items="presets"
              v-model="editField.preset"
              item-text="name"
              item-value="value"
          >
            <template #selection="{ item }">
              <v-icon class="mr-2">mdi-{{ item.icon }}</v-icon>
              {{ item.name }}
            </template>
            <template #item="{ item }">
              <v-icon class="mr-2">mdi-{{ item.icon }}</v-icon>
              {{ item.name }}
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
              label="Card Display"
              :items="cardDisplays"
              v-model="editField.options.cardDisplay"
              item-text="name"
              item-value="value"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </EditDialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EditDialog from '../EditDialog';
  import { A_CREATE_FIELD, A_UPDATE_FIELD } from '../../store/actions.type';
  import { defaultModel, PRESETS } from '../../store/fields.module';

  export default {
    name: 'FieldEditDialog',
    components: { EditDialog },
    props: {
      field: Object
    },
    data: () => ({
      editField: { ...defaultModel },
      presets: PRESETS
    }),
    computed: {
      ...mapGetters(['type']),
      add() {
        return !this.editField._id;
      },
      cardDisplays() {
        let displays = [{ name: 'None', value: 'none' }];
        if (this.editField.preset === 'photo') {
          displays.push({ name: 'Photo', value: 'photo' });
        } else {
          displays = displays.concat([
            { name: 'Title', value: 'title' },
            { name: 'Subtitle', value: 'subtitle' },
            { name: 'Content', value: 'content' }
          ]);
        }
        return displays;
      }
    },
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? A_CREATE_FIELD : A_UPDATE_FIELD;
        this.$store.dispatch(command, this.editField)
            .then(() => this.$refs.dialog.close());
      },
      reset() {
        if (this.field) {
          this.editField = { ...this.field };
        } else {
          this.editField = { ...defaultModel, type: this.type._id };
        }
      }
    }
  };
</script>

<style scoped>

</style>
