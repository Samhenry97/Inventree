<template>
  <div>
    <v-textarea v-if="field.preset === 'text-long'" :value="value" :label="field.name" @change="update($event)"></v-textarea>
    <v-select
        v-else-if="['select', 'select-multi'].includes(field.preset)"
        :items="field.options.choices"
        :value="value"
        :label="field.name"
        :multiple="field.preset === 'select-multi'"
        @change="update($event)"
    ></v-select>
    <v-checkbox
        v-else-if="field.preset === 'checkbox'"
        :label="field.name"
        :input-value="value"
        @change="update($event)"
    ></v-checkbox>
    <v-menu
        v-else-if="field.preset === 'date'"
        ref="dateMenu"
        v-model="dateMenu"
        :return-value.sync="value"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
            :value="value"
            :label="field.name"
            @change="update($event)"
            clearable
            prepend-inner-icon="mdi-calendar"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          :value="value"
          @change="update($event)"
          scrollable
          color="secondary"
          header-color="primary"
      >
        <v-spacer></v-spacer>
        <v-btn text @click="dateMenu = false">Cancel</v-btn>
        <v-btn text color="success" @click="$refs.dateMenu.save(value)">Okay</v-btn>
      </v-date-picker>
    </v-menu>
    <div v-else-if="field.preset === 'rating'">
      <v-label>{{ field.name }}</v-label>
      <v-rating
          :value="value"
          @input="update($event)"
          half-increments
          hover
          empty-icon="mdi-heart-outline"
          half-icon="mdi-heart-half-full"
          full-icon="mdi-heart"
          color="red"
          background-color="grey"
      ></v-rating>
    </div>
    <v-text-field v-else :value="value" :label="field.name" @change="update($event)"></v-text-field>
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
    data: () => ({
      dateMenu: false
    }),
    methods: {
      update(value) {
        this.$emit('input', value);
      }
    }
  };
</script>

<style scoped>

</style>
