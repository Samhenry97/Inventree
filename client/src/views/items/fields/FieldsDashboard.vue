<template>
  <div id="fields-dashboard">
    <FieldEditDialog ref="editDialog" :field="editField"></FieldEditDialog>

    <div class="d-flex align-center">
      <p class="display-1 mb-0">Fields for {{ type.name }} ({{ fields.length }})</p>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="edit(null)">
        <v-icon class="mr-2">mdi-plus</v-icon>
        Add Field
      </v-btn>
    </div>

    <v-divider class="my-2"></v-divider>

    <v-row>
      <v-col v-for="field of fields" :key="field._id" cols="12" sm="6" md="4" lg="3">
        <FieldCard :field="field" @click="edit(field)" @edit="edit" @remove="remove"></FieldCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FieldEditDialog from '../../../components/fields/FieldEditDialog';
  import FieldCard from '../../../components/fields/FieldCard';
  import { A_DELETE_FIELD } from '../../../store/actions.type';

  export default {
    name: 'FieldsDashboard',
    components: { FieldCard, FieldEditDialog },
    data: () => ({
      editField: null
    }),
    computed: {
      ...mapGetters(['type', 'fields'])
    },
    methods: {
      edit(field) {
        this.editField = field;
        this.$nextTick(() => this.$refs.editDialog.open());
      },
      remove(field) {
        if (confirm('Are you sure you want to delete this field?')) {
          this.$store.dispatch(A_DELETE_FIELD, field);
        }
      }
    }
  };
</script>

<style scoped>

</style>
