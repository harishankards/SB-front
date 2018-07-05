<template>
  <div>
    <vuestic-switch class="col-md-6 switch" v-model="isProjects">
      <span slot="trueTitle">Projects</span>
      <span slot="falseTitle">Contests</span>
    </vuestic-switch>
    <div class="row" v-if="showProjects">
      <div class="col-md-6">
        <div class="noProjects" v-show="noProjects">
          <h4> Oops! You have no Projects to view. </h4>              
        </div>
        
        <div class="showProjects" v-for="project in projectArray" :key="project.id">
          <div class="projects-name"><strong>{{project.title}}</strong></div>	
          <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
          <button class="button" @click="showStats(project)">Show stats</button>
        </div>
        
      </div>
      <vuestic-widget class="col-md-6" v-if="showChart">
        <div class="Chart">
          <Chart :chartData="chartDataProject" :options="{responsive: true, maintainAspectRatio: false}"></Chart>
          <h4 class="ChartStyle">Click your project to view the stats!!</h4>
        </div>
      </vuestic-widget>
    </div>
    <div class="row" v-if="showContests">
      <div class="col-md-6">
        <div class="noProjects" v-show="noContests">
          <h4> Oops! You have no Contests to view. </h4>              
        </div>
        <div class="showProjects" v-for="contest in contestArray" :key="contest.id">
          <div class="projects-name"><strong>{{contest.title}}</strong></div>	
          <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
          <button class="button" @click="showStatsContest(contest)">Show stats</button>
        </div>
      </div>
      <vuestic-widget class="col-md-6" v-if="showChart">
        <div class="Chart">
          <Chart :chartData="chartDataContest" :options="{responsive: true, maintainAspectRatio: false}"></Chart>
          <h4 class="ChartStyle">Click any contest to view the stats!!</h4>
        </div>
      </vuestic-widget>
    </div>
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
      contestArray: [],
      noProjects: false,
      noContests: false,
      showChart: false,
      isProjects: true,
      showProjects: true,
      showContests: false,
      chartDataProject: {
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
      },
      chartDataContest: {
        labels: ['Registrations', 'Shares', 'Views'],
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
      this.showChart = false
      const self = this
      this.chartDataProject.datasets[0].data = []
      this.chartDataProject.datasets[0].data = [project.upvotes.length, 2, 2]
      this.$nextTick(() => {
        self.showChart = true
      })
    },
    showStatsContest (contest) {
      this.showChart = false
      const self = this
      this.chartDataContest.datasets[0].data = []
      this.chartDataContest.datasets[0].data = [contest.registrations.length, 2, 2]
      this.$nextTick(() => {
        self.showChart = true
      })
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
      const contestArr = companyData.data[0].contests
      if (projectArr.length === 0) {
        this.noProjects = true
      } else {
        projectArr.map(project => {
          // console.log('single project', project)
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
      }
      if (contestArr.length === 0) {
        this.noContests = true
      } else {
        contestArr.map(contest => {
          // console.log('single project', project)
          this.$http.get('/contests/get?id=' + contest, {
            headers: {
              'Authorization': 'Bearer ' + lsToken
            }
          })
          .then((contestData) => {
            this.contestArray.push(contestData.data)
          })
          .catch((contestErr) => {
            console.log('contest err', contestErr)
          })
        })
      }
    }).catch((studentErr) => {
      console.log('student err', studentErr)
    })
  },
  updated () {
    if (this.isProjects) {
      this.showContests = false
      this.showProjects = true
    } else {
      this.showProjects = false
      this.showContests = true
    }
  }
}
</script>

<style scoped>
  .projects-name{
    color: #4ae387;
  }
  .showProjects{
    margin-left: 5%;
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
    right: 3%;
  }
  h4, .h4 {
    text-align: center !important;
  }
</style>