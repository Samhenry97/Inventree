<template>
  <div id="books-sidebar">
    <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        mobile-break-point="md"
        :temporary="$vuetify.breakpoint.smAndDown"
        :permanent="$vuetify.breakpoint.mdAndUp"
    >
      <v-list dense nav>
        <v-list-item to="/books/library" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Library</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/books/shelves" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-server</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Shelves</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/books/checkouts" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Checkouts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/books/reports" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/books/add" link color="secondary">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add Books</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'BooksSidebar',
  data: () => ({
    drawer: null
  })
};
</script>

<style scoped>

</style>
