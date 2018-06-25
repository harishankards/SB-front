<template>
<div class="row">
    <div class="col-md-6">
      <div class="noProjects" v-show="noProjects">
          <h4> Oops! You have no Projects to view. </h4>              
      </div>
      <div class="showProjects col-md-12" v-for="project in projectArray" :key="project.id">        
          <div class="projects-name"><strong>{{project.title}}</strong></div>	
          <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span> 
          <button class="button" @click="showStats(project)">Show stats</button>        
        
      </div>
    </div>
    <vuestic-widget class="col-md-6">
      <div class="Chart">
      <Chart v-if="showChart" :chartData="chartData" :options="{responsive: true, maintainAspectRatio: false}"></Chart>
      <h3 class="ChartStyle" v-if="!showChart">Click your project to view the stats!!</h3>
    </div>
    </vuestic-widget>
</div>
</template>

<script>
import Chart from './Chart'
import Vue from 'vue'

export default {
  name: 'stats',
  components: {
    Chart
  },
  data () {
    return {
      projectArray: [],
      noProjects: false,
      showChart: false,
      chartData: {
        labels: ['Upvotes', 'Shares', 'Views'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              'blue'
            ],
            data: []
          }
        ]
      }
    }
  },
  methods: {
    showStats (project) {
      this.showChart = true
      console.log('Inside showStats function', this.chartData.datasets[0].data)
      this.chartData.datasets[0].data = []
      // this.chartData.datasets[0].data = [project.upvotes.length, 2, 3]
      Vue.set(this.chartData.datasets[0].data, 0, project.upvotes.length)
      Vue.set(this.chartData.datasets[0].data, 1, 2)
      Vue.set(this.chartData.datasets[0].data, 2, 3)
      // this.chartData.datasets[0].data.splice(0, 1, project.upvotes.length)
      // this.chartData.datasets[0].data.splice(1, 1, 1)
      // this.chartData.datasets[0].data.splice(2, 1, 2)
      console.log('Assigned', this.chartData.datasets[0].data)
    }
  },
  created () {
    const email = this.$ls.get('email')
    const lsToken = this.$ls.get('token')
    this.$http.get('/students/get?email=' + email, {
      headers: {
        'Authorization': 'Bearer ' + lsToken
      }
    })
      .then((studentData) => {
        console.log('student Data', studentData.data)
        const projectArr = studentData.data[0].projects
        // console.log('projectArr', projectArr)
        if (projectArr.length === 0) {
          this.noProjects = true
        }
        projectArr.map(project => {
          console.log('single project', project)
          this.$http.get('/projects/get?id=' + project, {
            headers: {
              'Authorization': 'Bearer ' + lsToken
            }
          })
          .then((projectData) => {
            // console.log('project data', projectData)
            this.projectArray.push(projectData.data)
            console.log('project array', this.projectArray)
          })
          .catch((projectErr) => {
            console.log('project err', projectErr)
          })
        })
      }).catch((studentErr) => {
        console.log('student err', studentErr)
      })
  }
}
</script>

<style scoped>
  .projects-name{
    color: #4ae387;
  }
  .showProjects{
    border-bottom: 1px solid lightgray;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  .projects-time{
    margin-top: 3%;
  }
  .button{
    background-color: #4ae387;
    align-content: center;
    border: 3px;
    font-size: 12px;
    margin-left: 3%;
    width: 20%;
    padding-top: 1%;
    padding-bottom: 1%;
    float: right;
    cursor: pointer;
  }
  h3, .h3 {
    margin-bottom: 1.5rem;
    margin-top: 10% !important;
    margin-left: 6% !important;
}
</style>


