<template>
  <div id="reports">
    <p class="display-1 mb-0">Reports</p>
    <v-divider class="my-2"></v-divider>

    <BarChart v-if="chartData" :chartData="chartData" :options="options"></BarChart>
  </div>
</template>

<script>
  import BarChart from '../../components/charts/BarChart';
  export default {
    name: 'ReportsDashboard',
    components: { BarChart },
    data: () => ({
      chartData: null,
      options: null
    }),
    mounted() {
      this.chartData = {
        labels: ['hello', 'world', 'hi'],
        datasets: [
          {
            label: 'Books',
            data: [500, 300, 333]
          }
        ]
      };
    }
  };
</script>

<style scoped>

</style>
