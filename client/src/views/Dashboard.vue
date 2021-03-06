<template>
  <div id="dashboard">
    <v-content>
      <div v-if="authed" class="pa-4">
        <ContainerEditDialog ref="editContainerDialog" :container="editContainerSelection"></ContainerEditDialog>
        <TypeEditDialog
            ref="editTypeDialog"
            :type="editTypeSelection"
            :container="editTypeContainerSelection"
        ></TypeEditDialog>

        <Header>
          My Containers ({{ containers.length }})
          <template #right>
            <v-btn color="secondary" @click="editContainer(null)">
              <v-icon class="mr-2">mdi-plus</v-icon>
              Add Container
            </v-btn>
          </template>
        </Header>

        <div v-for="container of containers" :key="container._id">
          <v-toolbar color="secondary" dense dark class="mt-8">
            {{ container.name }}
            <v-spacer></v-spacer>
            <v-btn @click="editContainer(container)" text>Edit</v-btn>
            <v-btn @click="removeContainer(container)" text color="error">Delete</v-btn>
          </v-toolbar>
          <div class="pa-4 elevation-1">
            <v-row>
              <v-col v-for="type of typeByContainer(container._id)" :key="type._id" cols="12" sm="6" md="4" lg="3">
                <TypeCard
                    @click="$router.push({ name: 'items', params: { container: container._id, type: type._id } })"
                    @edit="editType"
                    @remove="removeType"
                    :type="type"
                ></TypeCard>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-card @click="addType(container)" hover ripple class="fill-height">
                  <v-card-title class="fill-height align-center justify-center secondary--text">
                    <v-icon color="secondary">mdi-plus</v-icon>
                    Add Type
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>

      <div v-else class="pa-4">
        <p class="display-1">Welcome to Inventree!</p>
      </div>
    </v-content>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import TypeCard from '../components/types/TypeCard';
  import TypeEditDialog from '../components/types/TypeEditDialog';
  import ContainerEditDialog from '../components/containers/ContainerEditDialog';
  import { A_DELETE_CONTAINER, A_DELETE_TYPE } from '../store/actions.type';
  import Header from '../components/Header';

  export default {
    name: 'Dashboard',
    components: { Header, ContainerEditDialog, TypeEditDialog, TypeCard },
    computed: {
      ...mapGetters(['authed', 'containers', 'typeByContainer', 'containerById'])
    },
    data: () => ({
      drawer: null,
      editTypeSelection: null,
      editTypeContainerSelection: null,
      editContainerSelection: null
    }),
    methods: {
      addType(container) {
        this.editTypeContainerSelection = container;
        this.editTypeSelection = null;
        this.$nextTick(() => this.$refs.editTypeDialog.open());
      },
      editType(type) {
        this.editTypeContainerSelection = this.containerById(type.container);
        this.editTypeSelection = type;
        this.$nextTick(() => this.$refs.editTypeDialog.open());
      },
      removeType(type) {
        if (confirm('Are you sure you want to delete this type?')) {
          this.$store.dispatch(A_DELETE_TYPE, type);
        }
      },
      editContainer(container) {
        this.editContainerSelection = container;
        this.$refs.editContainerDialog.open();
      },
      removeContainer(container) {
        if (confirm('Are you sure you want to delete this container?')) {
          this.$store.dispatch(A_DELETE_CONTAINER, container);
        }
      }
    }
  };
</script>
