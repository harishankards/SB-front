<template>
  <div class="dashboard">

    <newsfeed-info-widgets></newsfeed-info-widgets>

    <div class="row">
      <div class="col-md-8">
        <vuestic-widget class="" v-for="post in posts" :key="post.id">
          <div >
            <p class="feed-card-info"> <strong> {{post.by}}</strong> {{post.action}} this</p>
            <hr>
          </div>
          <div>
            <div id="feed-card-image">{{giveInitial(post)}}</div>
            <div id="feed-card-user-name-div">
              <span class="feed-card-username"><strong><a href="#">{{post.name}}</a> </strong></span><br>
              <span class="feed-card-time">{{post.calender}}</span>
            </div>
          </div>
          <div id="post-content-div">
            <p id="post-description">{{post.post_desc}}</p>
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

  export default {
    name: 'dashboard',
    components: {
      NewsfeedInfoWidgets
    },
    data () {
      return {
        posts: [
          {
            id: 0,
            photoURL: 'https://goo.gl/KnVxVY',
            name: 'Harishankar',
            text: 'registered for a contest',
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
   
</style>
