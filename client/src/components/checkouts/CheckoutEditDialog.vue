<template>
  <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      max-width="800px"
  >
    <v-card>
      <v-toolbar dark color="secondary">
        <v-toolbar-title>{{ add ? 'New' : 'Edit' }} Checkout</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-menu
                ref="dateOutMenu"
                v-model="dateOutMenu"
                :return-value.sync="editCheckout.dateOut"
                :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="editCheckout.dateOut"
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
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="editCheckout.dateIn"
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

      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import Checkout from '../../models/checkout';

  export default {
    name: 'CheckoutEditDialog',
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
    watch: {
      checkout() {
        this.reset();
      }
    },
    computed: {
      add() {
        return !this.editCheckout._id;
      }
    },
    methods: {
      open() {
        this.dialog = true;
      },
      reset() {
        if (this.checkout) {
          this.editCheckout = { ...this.checkout, book: this.book };
        } else {
          this.editCheckout = { ...Checkout.defaultModel, book: this.book };
        }
      },
      save() {
        const command = this.add ? 'createCheckout' : 'updateCheckout';
        this.$socket.emit(command, this.editCheckout);
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>
