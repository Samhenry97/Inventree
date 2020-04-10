<template>
  <v-dialog
      :fullscreen="$vuetify.breakpoint.smAndDown"
      v-model="dialog"
      persistent
  >
    <v-card>
      <v-toolbar dark color="secondary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <slot></slot>

      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <slot name="buttons">
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="$emit('save')">Save</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditDialog',
    props: {
      title: String
    },
    data: () => ({
      dialog: false
    }),
    methods: {
      open() {
        this.dialog = true;
      },
      close() {
        this.dialog = false;
      }
    }
  };
</script>

<style scoped>

</style>
