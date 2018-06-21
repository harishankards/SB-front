<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mounted () {
    this.renderChart({
      labels: ['Upvotes', 'Shares', 'Views'],
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            'blue'
          ],
          data: [60, 20, 80]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>


