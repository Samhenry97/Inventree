<template>
  <EditDialog ref="dialog" :title="`${add ? 'New' : 'Edit'} Checkout`" @save="save">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-menu
              ref="dateOutMenu"
              v-model="dateOutMenu"
              :return-value.sync="editCheckout.dateOut"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  v-model="editCheckout.dateOut"
                  clearable
                  label="Date Out"
                  prepend-inner-icon="mdi-calendar"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="editCheckout.dateOut"
                scrollable
                color="secondary"
                header-color="primary"
                :allowed-dates="date => editCheckout.dateIn ? new Date(date) <= new Date(editCheckout.dateIn) : true"
            >
              <v-spacer></v-spacer>
              <v-btn text @click="dateOutMenu = false">Cancel</v-btn>
              <v-btn text color="success" @click="$refs.dateOutMenu.save(editCheckout.dateOut)">Okay</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6">
          <v-menu
              ref="dateInMenu"
              v-model="dateInMenu"
              :return-value.sync="editCheckout.dateIn"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  v-model="editCheckout.dateIn"
                  clearable
                  label="Date In"
                  prepend-inner-icon="mdi-calendar"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="editCheckout.dateIn"
                scrollable
                color="secondary"
                header-color="primary"
                :allowed-dates="date => editCheckout.dateOut ? new Date(date) >= new Date(editCheckout.dateOut) : true"
            >
              <v-spacer></v-spacer>
              <v-btn text @click="dateInMenu = false">Cancel</v-btn>
              <v-btn text color="success" @click="$refs.dateInMenu.save(editCheckout.dateIn)">Okay</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-text>
  </EditDialog>
</template>

<script>
  import { formatPickerDate } from '../../common/util';
  import EditDialog from '../EditDialog';
  import { defaultModel } from '../../store/checkouts.module';

  export default {
    name: 'CheckoutEditDialog',
    components: { EditDialog },
    props: {
      checkout: Object,
      book: Object
    },
    data: () => ({
      editCheckout: {},
      dialog: false,
      dateOutMenu: false,
      dateInMenu: false
    }),
    computed: {
      add() {
        return !this.editCheckout._id;
      }
    },
    watch: {
      checkout() {
        this.reset();
      }
    },
    methods: {
      open() {
        this.reset();
        this.$refs.dialog.open();
      },
      save() {
        const command = this.add ? 'createCheckout' : 'updateCheckout';
        this.$socket.emit(command, this.editCheckout);
        this.$refs.dialog.close();
      },
      reset() {
        if (this.checkout) {
          this.editCheckout = {
            ...this.checkout,
            dateIn: formatPickerDate(this.checkout.dateIn),
            dateOut: formatPickerDate(this.checkout.dateOut)
          };
        } else {
          this.editCheckout = { ...defaultModel, book: this.book };
        }
      },
    }
  };
</script>

<style scoped>

</style>
