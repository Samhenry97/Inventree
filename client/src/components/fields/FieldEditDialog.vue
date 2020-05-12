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
        <v-col v-if="['select', 'select-multi'].includes(editField.preset)" cols="12" sm="6">
          <v-list subheader dense>
            <v-subheader>Choices</v-subheader>

            <v-list-item v-for="(choice, index) of editField.options.choices" :key="index" @click="() => null">
              <v-list-item-content>
                <v-text-field v-model="editField.options.choices[index]"></v-text-field>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="error" @click="deleteChoice(choice)">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item @click="addChoice()">
              <v-list-item-content>
                Add Choice
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="success">mdi-plus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
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
      editField: defaultModel(),
      editChoice: '',
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
          this.editField = { ...defaultModel(), type: this.type._id };
        }
      },
      addChoice() {
        if (!this.editField.options.choices) this.editField.options.choices = [];
        if (!this.editField.options.choices.includes('')) {
          this.editField.options.choices.push('');
        }
      },
      deleteChoice(choice) {
        this.editField.options.choices = this.editField.options.choices.filter(item => item !== choice);
      }
    }
  };
</script>

<style scoped>

</style>
