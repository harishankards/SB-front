<template>
  <div class="row">
    <div class="col-md-8">
      <vuestic-widget class="" v-for="award in awards" :key="award.id">
        <div>
          <div id="projects-name-div">
            <span class="projects-name"><strong><a href="#">{{award.name}}</a> </strong></span><br>
            <span class="projects-time">{{award.calender}}</span>
          </div>
        </div>
        <div id="projects-content-div">
          <span id="projects-description">{{award.post_desc}}</span>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-4">
      <vuestic-widget class="createproject-div">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Saw someone great?</h5>
          <button class="btn btn-primary btn-micro" @click="createNew"> Announce award</button>    
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
    name: 'companyawards',
    data () {
      return {
        awards: [
          {
            id: 0,
            name: 'Best intern award - Summer',
            calender: '3mo',
            post_desc: 'Best internship award based on the student\'s performance during summer internship '
          },
          {
            id: 1,
            name: 'Best intern award - Winter',
            calender: '6mo',
            post_desc: 'Best internship award based on the student\'s performance during summer internship'
          },
          {
            id: 2,
            name: 'Best programmer',
            calender: '1y',
            post_desc: 'For solving complex algorithms and performance optimisation during Autumn contest'
          }
        ],
        posts: [
          {
            id: 0,
            photoURL: 'https://goo.gl/KnVxVY',
            name: 'Harishankar',
            text: 'registered for your contest SpriteXtreme',
            action: 'upvoted'
          },
          {
            id: 1,
            photoURL: 'https://goo.gl/1nKusR',
            name: 'Balaji D Loganathan',
            text: 'was given an award by a company',
            action: 'commented'
          },
          {
            id: 2,
            photoURL: 'https://goo.gl/Ckaexc',
            name: 'Surendran S',
            text: 'has the most upvoted project which you upvoted',
            action: 'upvoted'
          }
        ]
      }
    },
    methods: {
      createNew: function () {
        this.$router.push('/company/awards/new')
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
