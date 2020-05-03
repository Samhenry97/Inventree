<template>
  <v-card class="action-card" hover ripple shaped @click="$emit('click')">
    <v-img v-if="showItem" height="192px" :src="item.smallThumbnail">
      <div v-if="!checkout.dateIn" class="img-overlay">
        <v-btn color="primary" @click.stop="finishReading">Finish Reading</v-btn>
      </div>
    </v-img>
    <div v-if="showItem">
      <v-card-title><v-clamp autoresize :max-lines="2">{{ item.title }}</v-clamp></v-card-title>
      <v-card-subtitle><v-clamp autoresize :max-lines="1">{{ item.author }}</v-clamp></v-card-subtitle>
    </div>
    <v-card-text>
      <b>Date Out:</b> {{ formatDate(checkout.dateOut) }}
      <span v-if="checkout.dateIn">
        <br>
        <b>Date In:</b> {{ formatDate(checkout.dateIn) }}
        <br>
        <b>Total Time:</b> {{ dateDifference(checkout.dateOut, checkout.dateIn) }}
      </span>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="edit(checkout)">Edit</v-btn>
      <v-btn color="error" text @click.stop="remove(checkout)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { formatDate, dateDifference } from '../../common/util';
  import VClamp from 'vue-clamp';
  import { A_UPDATE_CHECKOUT } from '../../store/actions.type';

  export default {
    name: 'CheckoutCard',
    props: {
      checkout: Object,
      edit: Function,
      remove: Function,
      showItem: Boolean
    },
    components: {
      VClamp
    },
    computed: {
      ...mapGetters(['itemById']),
      item() {
        return this.itemById(this.checkout.item);
      },
    },
    data: () => ({
      formatDate,
      dateDifference
    }),
    methods: {
      finishReading() {
        const checkout = { ...this.checkout, dateIn: new Date() };
        this.$store.dispatch(A_UPDATE_CHECKOUT, checkout);
      }
    }
  };
</script>

<style scoped>

</style>
