<template>
<div class="row">
    <div class="col-md-6">
      <div class="noProjects" v-show="noProjects">
          <h4> Oops! You have no Projects to view. </h4>              
      </div>
      <div class="showProjects" v-for="project in projectArray" :key="project.id">
            <span class="projects-name"><strong>{{project.title}}</strong></span>	
            <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
            <button class="button" @click="showStats(project)">Show stats</button>
      </div>
    </div>
    <vuestic-widget class="col-md-6">
      <div class="Chart">
      <Chart v-if="showChart" :data="chartData" :options="{responsive: false, maintainAspectRatio: false}"></Chart>
    </div>
    </vuestic-widget>
</div>
</template>

<script>
import Chart from './Chart'

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
      this.chartData.datasets[0].data = []
      this.chartData.datasets[0].data = [project.upvotes.length, 2, 2]
    }
  },
  created () {
    const email = this.$ls.get('email')
    const lsToken = this.$ls.get('token')
    this.$http.get('/companies/get?email=' + email, {
      headers: {
        'Authorization': 'Bearer ' + lsToken
      }
    })
    .then((companyData) => {
      console.log('company Data', companyData.data)
      const projectArr = companyData.data[0].projects
      if (projectArr.length === 0) {
        this.noProjects = true
      }
      projectArr.map(project => {
        console.log('single project', project)
        this.$http.get('/companyprojects?id=' + project, {
          headers: {
            'Authorization': 'Bearer ' + lsToken
          }
        })
        .then((projectData) => {
          this.projectArray.push(projectData.data)
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
    margin-left: 5%;
    margin-top: 3%;
  }
  .projects-time{
    margin-left: 5%;
  }
  .button{
    background-color: #4ae387;
    align-content: center;
    border: 3px;
    font-size: 12px;
    margin-left: 3%;
    width: 15%;
    padding-top: 1%;
    padding-bottom: 1%;
  }
</style>