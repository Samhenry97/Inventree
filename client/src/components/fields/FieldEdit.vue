<template>
  <div>
    <v-text-field v-if="field.preset === 'text'" :value="value" :label="field.name" @change="update($event)"></v-text-field>
    <v-textarea v-if="field.preset === 'text-long'" :value="value" :label="field.name" @change="update($event)"></v-textarea>
    <v-select
        v-if="['select', 'select-multi'].includes(field.preset)"
        :items="field.options.choices"
        :value="value"
        :label="field.name"
        :multiple="field.preset === 'select-multi'"
        @change="update($event)"
    ></v-select>
  </div>
</template>

<script>
  export default {
    name: 'FieldEdit',
    props: {
      field: {
        type: Object,
        required: true
      },
      value: null
    },
    methods: {
      update(value) {
        this.$emit('input', value);
      }
    }
  };
</script>

<style scoped>

</style>
