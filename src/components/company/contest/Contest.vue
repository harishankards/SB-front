<template>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget class="" v-for="contest in contests" :key="contest.id">
          <div>
            
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="#">{{contest.name}}</a> </strong></span><br>
              <span class="projects-time">{{contest.calender}}</span>
            </div>
          </div>
          <div id="projects-content-div">
            <span id="projects-description">{{contest.post_desc}}</span>
          </div>
          
        </vuestic-widget>
      </div>
      <div class="col-md-4">
        <vuestic-widget class="createproject-div">
          <div class="col-md-offset-6 col-md-12">
            <h5 class="gotnew">Got something new?</h5>
            <button class="btn btn-primary btn-micro" @click="createNew"> New Contest</button>    
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
    name: 'Contest',
    component: {},
    data () {
      return {
        contests: [
          {
            id: 0,
            name: 'SpriteXtreme',
            calender: '3mo',
            post_desc: 'A over night coding marathon to bring out the entrepreneur in you'
          },
          {
            id: 1,
            name: 'SpriteXchange',
            calender: '6mo',
            post_desc: 'A knowledge sharing workshop for students'
          },
          {
            id: 2,
            name: 'Riddle of Sphinx',
            calender: '1y',
            post_desc: 'Solve the riddles and get to the top'
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
        this.$router.push('/company/contests/new')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";

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
