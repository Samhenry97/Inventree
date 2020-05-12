<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} ${type.name}`" @save="save">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
              :items="shelves"
              v-model="editItem.shelves"
              label="Shelf"
              item-text="name"
              item-value="_id"
              multiple
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <TagSelector v-model="editItem.tags"></TagSelector>
        </v-col>
        <v-col v-for="field of fields" :key="field._id" cols="12" md="6">
          <FieldEdit :field="field" v-model="editItem[field.name]"></FieldEdit>
        </v-col>
      </v-row>
    </v-card-text>
  </EditDialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EditDialog from '../EditDialog';
  import { A_CREATE_ITEM, A_UPDATE_ITEM } from '../../store/actions.type';
  import { defaultModel } from '../../store/items.module';
  import TagSelector from '../tags/TagSelector';
  import FieldEdit from '../fields/FieldEdit';

  export default {
    name: 'ItemEditDialog',
    components: { FieldEdit, TagSelector, EditDialog },
    props: {
      item: Object
    },
    data: () => ({
      editItem: { ...defaultModel }
    }),
    computed: {
      ...mapGetters(['fields', 'type', 'shelves']),
      add() {
        return !this.editItem._id;
      }
    },
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? A_CREATE_ITEM : A_UPDATE_ITEM;
        this.$store.dispatch(command, this.editItem)
            .then(() => this.$refs.dialog.close());
      },
      reset() {
        if (this.item) {
          const defaultValues = {};
          for (const field of this.fields) {
            if (this.item[field.name] === undefined) {
              defaultValues[field.name] = field.options.default || null;
            }
          }

          this.editItem = {
            ...defaultValues,
            ...this.item
          };
        } else {
          const defaultValues = {};
          for (const field of this.fields) {
            defaultValues[field.name] = field.options.default || null;
          }

          this.editItem = {
            ...defaultModel,
            ...defaultValues,
            type: this.type._id
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>
