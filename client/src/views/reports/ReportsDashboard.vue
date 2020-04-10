<template>
  <div id="reports">
    <p class="display-1 mb-0">Reports</p>
    <v-divider class="my-2"></v-divider>

    <v-row>
      <v-col cols="12" sm="6">
        <v-menu
            ref="startDateMenu"
            v-model="startDateMenu"
            :return-value.sync="startDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
                v-model="startDate"
                clearable
                label="Start Date"
                prepend-inner-icon="mdi-calendar"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="startDate"
              scrollable
              color="secondary"
              header-color="primary"
              :allowed-dates="date => endDate ? new Date(date) >= new Date(endDate) : true"
          >
            <v-spacer></v-spacer>
            <v-btn text @click="startDateMenu = false">Cancel</v-btn>
            <v-btn text color="success" @click="$refs.startDateMenu.save(startDate)">Okay</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
            ref="endDateMenu"
            v-model="endDateMenu"
            :return-value.sync="endDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
                v-model="endDate"
                clearable
                label="End Date"
                prepend-inner-icon="mdi-calendar"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="endDate"
              scrollable
              color="secondary"
              header-color="primary"
              :allowed-dates="date => startDate ? new Date(date) >= new Date(startDate) : true"
          >
            <v-spacer></v-spacer>
            <v-btn text @click="endDateMenu = false">Cancel</v-btn>
            <v-btn text color="success" @click="$refs.endDateMenu.save(endDate)">Okay</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'ReportsDashboard',
    data: () => ({
      chartData: null,
      options: null,
      startDate: null,
      endDate: null,
      startDateMenu: false,
      endDateMenu: false
    }),
    watch: {
      startDate() {
        this.updateReports();
      },
      endDate() {
        this.updateReports();
      }
    },
    methods: {
      updateReports() {
        const range = { startDate: this.startDate, endDate: this.endDate };
        if (this.startDate && this.endDate) {
          this.$socket.emit('bookReports', range);
        }
      }
    }
  };
</script>

<style scoped>

</style>
