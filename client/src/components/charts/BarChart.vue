<script>
  import { Bar, mixins } from 'vue-chartjs';

  export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    name: 'BarChart',
    mounted() {
      this.renderChart(this.chartData, this.options);
    }
  };
</script>
