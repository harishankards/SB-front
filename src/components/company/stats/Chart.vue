<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp, reactiveData } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp, reactiveData],
  props: ['chartData', 'options'],
  watch: {
    chartData2: {
      deep: true,
      handler: function () {
        this.renderChart(this.chartData, this.options)
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>