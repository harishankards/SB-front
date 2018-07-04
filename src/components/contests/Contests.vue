<template>
  <div class="row">
     <div class="col-md-8 col-sm-12 side">
      <vuestic-widget class="createproject-div sidenav1">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Google's GSOC is here!</h5>
          <button class="btn btn-primary btn-micro"> Join now</button>    
        </div>
      </vuestic-widget>
      <Livefeeds></Livefeeds>
    </div>
    <div class="col-md-8 displayContent">
      <vuestic-switch class="col-md-13 switch" v-model="isUpcoming">
        <span slot="trueTitle">Upcoming</span>
        <span slot="falseTitle">History</span>
    </vuestic-switch>
      <div v-show="showUpcoming">
        <div class="noProjects" v-if="noUpcomingContests">
          <h4>You have no upcoming Contests to view. </h4>
        </div>

        <vuestic-widget class="" v-for="contest in upcomingContestArray" :key="contest.id">
          <div>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewContest(contest._id)">{{contest.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>

          <div id="projects-content-div">
            <span id="projects-description">{{contest.about}}</span>
          </div>
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in contest.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
        </vuestic-widget>
      </div>
      <div v-show="showHistory">
        <div class="noProjects" v-if="noPreviousContests">
          <h4>You have no Previous Contests to view. </h4>
        </div>

        <vuestic-widget class="" v-for="contest in previousContestArray" :key="contest.id" >
          
          <div>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewContest(contest._id)">{{contest.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>

          <div id="projects-content-div">
            <span id="projects-description">{{contest.about}}</span>
          </div>
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in contest.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import Livefeeds from '../rightsidebar/Livefeeds'
  export default {
    name: 'projectList',
    components: {Livefeeds},
    data () {
      return {
        contestArray: [],
        upcomingContestArray: [],
        previousContestArray: [],
        noContests: false,
        noPreviousContests: false,
        noUpcomingContests: false,
        isUpcoming: true,
        showUpcoming: true,
        showHistory: false,
        authToken: this.$ls.get('token')
      }
    },

    methods: {
      viewContest: function (contestId) {
        this.$router.push('/student/contest/' + contestId)
      }
    },
    updated () {
      if (this.upcomingContestArray.length === 0) {
        this.noContests = true
      }
      if (this.previousContestArray.length === 0) {
        this.noPreviousContests = true
      } else {
        this.noPreviousContests = false
      }
      if (this.upcomingContestArray.length === 0) {
        this.noUpcomingContests = true
      } else {
        this.noUpcomingContests = false
      }
      if (this.isUpcoming) {
        this.showUpcoming = true
        this.showHistory = false
      } else {
        this.showUpcoming = false
        this.showHistory = true
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
        const contestArr = studentData.data[0].contests
        // console.log('projectArr', projectArr)
        if (contestArr.length === 0) {
          this.noContests = true
        }
        contestArr.map(contest => {
          console.log('single contest', contest)
          this.$http.get('/contests/get?id=' + contest, {
            headers: {
              'Authorization': 'Bearer ' + lsToken
            }
          })
          .then((contestData) => {
            // console.log('project data', projectData)
            if (Date.parse(contestData.data.date.end) < Date.parse(new Date())) {
              console.log('project ended')
              this.previousContestArray.push(contestData.data)
            } else {
              this.upcomingContestArray.push(contestData.data)
              this.upcomingContestArray.sort((a, b) => new Date(a.date.start) - new Date(b.date.start))
              console.log('upcomingContestArray', this.upcomingContestArray)
            }
            // this.contestArray.push(contestData.data)
            // console.log('contest array', this.contestArray)
          })
          .catch((contestErr) => {
            console.log('contest err', contestErr)
          })
        })
      }).catch((studentErr) => {
        console.log('student err', studentErr)
      })
      if (this.upcomingContestArray.length === 0) {
        this.noUpcomingContests = true
      } else {
        this.noUpcomingContests = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .createproject-div{
    text-align: center;
  }
  .newsfeed-page{
    padding-left: 0rem !important;
  }
  .projects-time{
    margin-top: 3px;
    color: #a29e9e;
  }

  #projects-name-div{
    display: inline-block;
    // margin-left: 0.4rem;
  }

  #projects-content-div{
    margin-top: 0.5rem;
  }
  .sidenav1{
    // position: fixed;
    margin-left: 720px;
    width: 40%;
    // top: 13.7%;
  }
  @media screen and (max-width: 650px)
  {
    .sidenav1{
    position: relative !important;
    margin-left: 0px !important;
    width: 100% !important;
    }
  }
  .side{
    position: fixed;
  }
  .gotnew{
    margin-bottom: 1.5rem;
  }
  .noProjects {
    text-align: center;
    font-weight: bold;
    margin-top: 7rem;
  }
  #tagDiv {
    display: inline-block;
    margin-top: 1rem;
  }
  .tagNames {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    background: $tagcolor;
    color: white;
    border-radius: 5%;
  }
  .switch {
    margin-bottom: 2rem;
  }
   @media screen and (max-width: 650px){
    .displayContent{
      margin-top: 40%;
    }
   }
</style>
