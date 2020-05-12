<template>
  <v-card hover ripple shaped @click="$emit('click')">
    <v-card-title>{{ field.name }}</v-card-title>
    <v-card-subtitle>
      <v-icon>mdi-{{ preset.icon }}</v-icon>
      {{ preset.name }}
    </v-card-subtitle>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="$emit('edit', field)">Edit</v-btn>
      <v-btn color="error" text @click.stop="$emit('remove', field)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { PRESETS } from '../../store/fields.module';

  export default {
    name: 'FieldCard',
    props: {
      field: Object
    },
    computed: {
      preset() {
        const results = PRESETS.filter(preset => preset.value === this.field.preset);
        return results[0];
      }
    }
  };
</script>
