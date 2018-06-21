<template>
<div class="row">
    <div class="col-md-6">
      <div class="noProjects" v-show="noProjects">
          <h4> Oops! You have no Projects to view. </h4>              
      </div>
      <div class="showProjects" v-for="project in projectArray" :key="project.id">
            <span class="projects-name"><strong>{{project.title}}</strong></span>	
            <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
            <button class="button" @click="showStats()">Show stats</button>
      </div>
    </div>
    <vuestic-widget class="col-md-6">
      <div class="Chart">
      <h1 style="text-align:center;">Doughnutchart</h1>
      <Chart :data="chartData" :options="{responsive: false, maintainAspectRatio: false}"></Chart>
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
      chartData: {
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
      }
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
  },
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
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


