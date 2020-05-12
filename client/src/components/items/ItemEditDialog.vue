<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} ${type.name}`" @save="save">

  </EditDialog>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EditDialog from '../EditDialog';
  import { A_CREATE_ITEM, A_UPDATE_ITEM } from '../../store/actions.type';
  import { defaultModel } from '../../store/items.module';

  export default {
    name: 'ItemEditDialog',
    components: { EditDialog },
    props: {
      item: Object
    },
    data: () => ({
      editItem: { ...defaultModel }
    }),
    computed: {
      ...mapGetters(['fields', 'type']),
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
          this.editItem = { ...this.item };
        } else {
          const defaultValues = {};
          for (const field of this.fields) {
            defaultValues[field.name] = field.options.default || '';
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
