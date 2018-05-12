<template>
  <div class="dashboard">

    <newsfeed-info-widgets></newsfeed-info-widgets>

    <div class="row">
      <div class="col-md-8">
        <vuestic-widget class="" v-for="project in projectsData" :key="project.id">
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
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import NewsfeedInfoWidgets from './NewsfeedInfoWidgets'
  import Swal2 from 'sweetalert2'

  export default {
    name: 'dashboard',
    components: {
      NewsfeedInfoWidgets,
      VueDisqus
    },
    data () {
      return {
        companyData: '',
        projectsData: '',
        posts: [
          {
            id: 0,
            photoURL: 'https://goo.gl/KnVxVY',
            name: 'Harishankar',
            text: 'registered for your contest SpriteXtreme',
            action: 'upvoted',
            by: 'Balaji',
            calender: '32m',
            post_desc: 'Happy to upload my final year project'
          },
          {
            id: 1,
            photoURL: 'https://goo.gl/1nKusR',
            name: 'Balaji D Loganathan',
            text: 'was given an award by a company',
            action: 'commented',
            by: 'Surendran',
            calender: '3h',
            post_desc: 'Uploaded my dream project'
          },
          {
            id: 2,
            photoURL: 'https://goo.gl/Ckaexc',
            name: 'Surendran S',
            text: 'has the most upvoted project which you upvoted',
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
        this.$router.push('/company/project/' + projectId)
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
      this.$http.get('/companies/get?email=' + email, header)
      .then((companyData) => {
        console.log('company Data', companyData.data)
        self.companyData = companyData.data
        self.$http.get('/projects/all', header)
        .then(function (projectsData) {
          console.log('projects data', projectsData.data.projects)
          self.projectsData = projectsData.data.projects
        })
        .catch(function (projectsDataErr) {
          console.log('projects data err', projectsDataErr)
        })
      }).catch((companyErr) => {
        console.log('company err', companyErr)
      })
    },
    mounted () {
      const toast = Swal2.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })

      toast({
        type: 'success',
        title: 'Logged in successfully'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
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
   
</style>
