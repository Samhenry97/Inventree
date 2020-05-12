<template>
  <v-card hover ripple shaped @click="$emit('click')">
    <v-img v-if="photo" height="192px" :src="photo"></v-img>
    <v-card-title>
      <FieldDisplay v-for="field of titles" :key="field._id" :field="field" :value="item[field.name]"></FieldDisplay>
    </v-card-title>
    <v-card-subtitle>
      <FieldDisplay v-for="field of subtitles" :key="field._id" :field="field" :value="item[field.name]"></FieldDisplay>
    </v-card-subtitle>
    <v-card-text>
      <FieldDisplay v-for="field of content" :key="field._id" :field="field" :value="item[field.name]"></FieldDisplay>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn text @click.stop="$emit('edit', item)">Edit</v-btn>
      <v-btn color="error" text @click.stop="$emit('remove', item)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FieldDisplay from '../fields/FieldDisplay';

  export default {
    name: 'ItemCard',
    components: { FieldDisplay },
    props: {
      item: Object
    },
    computed: {
      ...mapGetters(['fields']),
      titles() {
        return this.fields.filter(field => field.options.cardDisplay === 'title');
      },
      subtitles() {
        return this.fields.filter(field => field.options.cardDisplay === 'subtitle');
      },
      content() {
        return this.fields.filter(field => field.options.cardDisplay === 'content');
      },
      photo() {
        const results = this.fields.filter(field => field.options.cardDisplay === 'photo');
        return results.length > 0 ? this.item[results[0].name] : null;
      }
    },
    methods: {

    }
  };
</script>

<style scoped>

</style>
