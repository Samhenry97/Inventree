<template>
  <div>
    <div v-html="html"></div>
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
      html() {
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
