<template>
  <div>
    <div class="hidden-xs-only">
      <div class="d-flex align-center">
        <p class="display-1 mb-0">
          <slot></slot>
        </p>
        <v-spacer></v-spacer>
        <slot name="right"></slot>
      </div>
    </div>
    <v-row dense class="hidden-sm-and-up">
      <v-col cols="12">
        <p class="display-1 mb-0">
          <slot></slot>
        </p>
      </v-col>
      <v-col cols="12">
        <slot name="right"></slot>
      </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
  export default {
    name: 'Header'
  };
</script>
