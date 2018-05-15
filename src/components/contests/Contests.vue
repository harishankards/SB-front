<template>
  <div class="row">
    <div class="col-md-8">
      <div class="noProjects" v-show="noContests">
          <h4> Oops! You have no Contests to view. </h4>
      </div>
      <vuestic-switch class="col-md-4 switch" v-model="isUpcoming">
        <span slot="trueTitle">Upcoming</span>
        <span slot="falseTitle">History</span>
    </vuestic-switch>
      <vuestic-widget class="" v-for="contest in upcomingContestArray" :key="contest.id" v-show="showUpcoming">
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
    <div class="col-md-4">
      <vuestic-widget class="createproject-div">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Google's GSOC is here!</h5>
          <button class="btn btn-primary btn-micro"> Join now</button>    
        </div>
      </vuestic-widget>
      <vuestic-widget class="live-feed" headerText="Live feeds">
        <vuestic-feed class="newsfeed-page" :initialPosts="posts"></vuestic-feed>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'projectList',
    component: {},
    data () {
      return {
        contestArray: [],
        upcomingContestArray: [],
        previousContestArray: [],
        noContests: false,
        noPreviousContests: false,
        isUpcoming: true,
        showUpcoming: true,
        showHistory: false,
        authToken: this.$ls.get('token'),
        posts: [
          {
            id: 0,
            photoURL: 'https://goo.gl/KnVxVY',
            name: 'Harishankar',
            text: 'is going for a contest'
          },
          {
            id: 1,
            photoURL: 'https://goo.gl/1nKusR',
            name: 'Balaji D Loganathan',
            text: 'upvoted for a project'
          },
          {
            id: 2,
            photoURL: 'https://goo.gl/Ckaexc',
            name: 'Surendran S',
            text: 'upvoted for a project'
          }
        ]
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
        console.log('no previous contests')
        this.noPreviousContests = true
      }
      if (this.isUpcoming) {
        console.log('it is upcoming')
        this.showUpcoming = true
        this.showHistory = false
      } else {
        console.log('it is history')
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
            if (contestData.data.date.end < new Date()) {
              console.log('project ended')
              this.previousContestArray.push(contestData.data)
            } else {
              this.upcomingContestArray.push(contestData.data)
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
    margin-bottom: 1rem;
  }
</style>
