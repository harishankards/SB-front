<template>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget class="" v-for="project in projects" :key="project.id">
          <div>
            
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="#">{{project.name}}</a> </strong></span><br>
              <span class="projects-time">{{project.calender}}</span>
            </div>
          </div>
          <div id="projects-content-div">
            <span id="projects-description">{{project.post_desc}}</span>
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
        projects: [
          {
            id: 0,
            name: 'Geo visual ranking approximation using machine learning',
            calender: '3mo',
            post_desc: 'Happy to upload my final year project'
          },
          {
            id: 1,
            name: 'Nodal analysis in optical image processing',
            calender: '6mo',
            post_desc: 'Uploaded my dream project'
          },
          {
            id: 2,
            name: 'Character identifier using moods using map cluster algorithm',
            calender: '1y',
            post_desc: 'Woohoo!!!! Finally uploaded the project ^_^'
          }
        ],
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
