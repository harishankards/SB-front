<template>
  <div class="dashboard">

    <newsfeed-info-widgets></newsfeed-info-widgets>
    <vuestic-switch class="col-md-4 switch" v-model="isProjects">
      <span slot="trueTitle">Projects</span>
      <span slot="falseTitle">Contests</span>
    </vuestic-switch>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget class="" v-for="project in companyprojectsArray" :key="project.id" v-show="showProjects">
          <div>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewCompanyProject(project._id)">{{project.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>
          <div id="projects-content-div">
            <!-- <span id="projects-description"><strong>Posted by:</strong>  {{project.author}}</span> -->
            <span id="projects-description">{{project.abstract}}</span>
            <!-- <a href="" class="viewMoreBtn" @click="viewProject(project._id)"> Read More <i class="fa fa-arrow-right"></i> </a>           -->
          </div>
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in project.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
          <hr>
          <div v-if="project.upvotes" class="userInteractionDiv">
            <i id="spacingStyle" class="fa fa-thumbs-up">{{project.upvotes.length}}</i>{{upvoteContent(project.upvotes.length)}}
          </div>
        </vuestic-widget>
        <vuestic-widget class="" v-for="project in projectsData" :key="project.id" v-show="showProjects">
          <div>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewProject(project._id)">{{project.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>
          <div id="projects-content-div">
            <span id="projects-description">{{project.abstract}}</span>
            <!-- <a href="" class="viewMoreBtn" @click="viewProject(project._id)"> Read More <i class="fa fa-arrow-right"></i> </a>           -->
          </div>
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in project.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
          <hr>
          <div class="userInteractionDiv">
            <i id="spacingStyle" class="fa fa-thumbs-up">{{project.upvotes.length}}</i>{{upvoteContent(project.upvotes.length)}}
          </div>
        </vuestic-widget>
        
        <vuestic-widget class="" v-for="contest in contestsData" :key="contest.id" v-show="showContests">
          <div>
            
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="#" @click.prevent="viewContest(contest._id)">{{contest.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>
          <div id="projects-content-div">
            <p id="projects-description">{{contest.about}}</p>
            <p><strong>Starts on:</strong>  {{contest.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
            <p><strong>Ends on: </strong> {{contest.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
          </div>
          <!-- <div><a href="" class="viewMoreBtn" @click="viewContest(contest._id)"> Read More <i class="fa fa-arrow-right"></i> </a></div> -->
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in contest.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
        </vuestic-widget>
      </div>
      <div class="col-md-4">
        <vuestic-widget class="live-feed" headerText="Live feeds">
          <vuestic-feed class="newsfeed-page" :initialPosts="posts"></vuestic-feed>
        </vuestic-widget>
      </div>
    </div>


  </div>
</template>

<script>
  import NewsfeedInfoWidgets from './NewsfeedInfoWidgets'
  import Swal2 from 'sweetalert2'

  export default {
    name: 'dashboard',
    components: {
      NewsfeedInfoWidgets
    },
    data () {
      return {
        projectsData: '',
        contestsData: '',
        studentData: '',
        companyprojectsArray: '',
        isProjects: true,
        showProjects: true,
        showContests: false,
        posts: [
          {
            id: 0,
            photoURL: 'https://goo.gl/KnVxVY',
            name: 'Harishankar',
            text: 'is going for a contest',
            action: 'upvoted',
            by: 'Balaji',
            calender: '32m',
            post_desc: 'Happy to upload my final year project'
          },
          {
            id: 1,
            photoURL: 'https://goo.gl/1nKusR',
            name: 'Balaji D Loganathan',
            text: 'upvoted for a project',
            action: 'commented',
            by: 'Surendran',
            calender: '3h',
            post_desc: 'Uploaded my dream project'
          },
          {
            id: 2,
            photoURL: 'https://goo.gl/Ckaexc',
            name: 'Surendran S',
            text: 'upvoted for a project',
            action: 'upvoted',
            by: 'HS',
            calender: '2d',
            post_desc: 'Woohoo!!!! Finally uploaded the project ^_^'
          }
        ]
      }
    },

    methods: {
      giveInitial: function (post) {
        let initial = post.name.charAt(0)
        return initial
      },
      viewProject: function (projectId) {
        this.$router.push('/student/project/' + projectId)
      },
      viewCompanyProject: function (projectId) {
        this.$router.push('/student/companyproject/' + projectId)
      },
      viewContest: function (contestId) {
        this.$router.push('/student/contest/' + contestId)
      },
      upvoteContent: function (len) {
        if (len < 2) {
          return 'upvote'
        } else {
          return 'upvotes'
        }
      }
    },
    created () {
      const email = this.$ls.get('email')
      const token = this.$ls.get('token')
      const self = this
      const header = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      this.$http.get('/students/get?email=' + email, header)
      .then((studentData) => {
        console.log('student Data', studentData.data)
        self.studentData = studentData.data
        self.$http.get('/projects/all', header)
        .then(function (projectsData) {
          console.log('projects data', projectsData.data.projects)
          self.projectsData = projectsData.data.projects
        })
        .catch(function (projectsDataErr) {
          console.log('projects data err', projectsDataErr)
        })
        self.$http.get('/contests/all', header)
        .then(function (contestsData) {
          console.log('contests data', contestsData.data.contests)
          self.contestsData = contestsData.data.contests
        })
        .catch(function (contestsDataErr) {
          console.log('contests data err', contestsDataErr)
        })
        self.$http.get('/companyprojects/all', header)
        .then(function (companyprojectsData) {
          console.log('company projects data', companyprojectsData.data.projects)
          self.companyprojectsArray = companyprojectsData.data.projects
        })
        .catch(function (companyprojectsErr) {
          console.log('companyprojects data err', companyprojectsErr)
        })
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
    },
    mounted () {
      if (this.$store.state.loginToastCounter === 0) {
        const toast = Swal2.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })

        toast({
          type: 'success',
          title: 'Signed in successfully'
        })
        this.$store.state.loginToastCounter++
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  .newsfeed-page{
    padding-left: 0rem !important;
  }
  .feed-card-time{
    margin-top: 3px;
    color: #a29e9e;
  }
  #feed-card-image{
    display: inline-block;
    border: 1px solid #a29e9e;
    border-radius: 50%;
    background: #CA3C25;
    font-size: 1.5rem;
    height: 3rem;
    width: 3rem;
    padding-left: 0.95rem;
    padding-top: 0.3rem;
    color: #e8dfdf;
    vertical-align: top;
  }

  #feed-card-user-name-div{
    display: inline-block;
    margin-left: 0.4rem;
  }

  #post-content-div{
    margin-top: 0.5rem;
  }
   
  .switch {
    margin-bottom: 1rem;
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
  .projects-time{
    margin-top: 3px;
    color: #a29e9e;
  }
  
  #projects-name-div{
    display: inline-block;
    // margin-left: 0.4rem;
  }

  .projects-name{
    font-size: 1.3rem;
  }
  #projects-content-div{
    margin-top: 0.5rem;
  }

  .viewMoreBtn {
    display: block;
  }
  .likebutton{
    color:#3385ff;
  }
  .btn-style{
    border: none;
    width: 100px;
    cursor: pointer;
    background: white;
    outline: none;
  }
  #spacingStyle{
    letter-spacing: 5px;
  }
</style>
