<template>
  <div class="row">
    <div class="col-md-8">
      <vuestic-widget class="" v-for="project in projectArray" :key="project.id">
        <div>
          
          <div id="projects-name-div">
            <span class="projects-name"><strong><a href="#">{{project.title}}</a> </strong></span><br>
            <span class="projects-time">{{project.calender}}</span>
          </div>
        </div>
        <div id="projects-content-div">
          <span id="projects-description">{{project.abstract}}</span>
        </div>
        
      </vuestic-widget>
    </div>
    <div class="col-md-4">
      <vuestic-widget class="createproject-div">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Got something new?</h5>
          <button class="btn btn-primary btn-micro" @click="createNew"> New project</button>    
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
        projectArray: [],
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
      createNew: function () {
        this.$router.push('/student/projects/new')
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
        // console.log('student Data', studentData.data)
        const projectArr = studentData.data[0].projects
        // console.log('projectArr', projectArr)
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
    margin-left: 0.4rem;
  }

  #projects-content-div{
    margin-top: 0.5rem;
  }

  .gotnew{
    margin-bottom: 1.5rem;
  }
</style>
