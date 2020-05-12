<template>
  <div>
    <div v-if="textual">
      {{ value }}
    </div>
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
      value: {
        type: String,
        required: true
      }
    },
    computed: {
      textual() {
        return ['text', 'text-long'].includes(this.field.preset);
      }
    }
  };
</script>

<style scoped>

</style>
