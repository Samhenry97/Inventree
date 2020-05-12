<template>
  <div>
    <v-rating
        v-if="field.preset === 'rating'"
        :value="value"
        readonly
        half-increments
        hover
        empty-icon="mdi-heart-outline"
        half-icon="mdi-heart-half-full"
        full-icon="mdi-heart"
        color="red"
        background-color="grey"
    ></v-rating>
    <div v-else>{{ display }}</div>
  </div>
</template>

<script>
  export default {
    name: 'FieldDisplay',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: null
    },
    computed: {
      display() {
        if (this.value instanceof Array) {
          return this.value.join(', ');
        } else {
          return this.value;
        }
      }
    }
  };
</script>

<style scoped>

</style>
