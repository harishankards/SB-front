<template>
  <div class="col-md-4 col-sm-12 sidenav">
      <vuestic-widget class="live-feed" headerText="Live feeds">
          <vuestic-feed class="newsfeed-page" :initialPosts="posts"></vuestic-feed>
        </vuestic-widget>
    </div>    
</template>

<script>
export default {
  name: 'livefeeds',
  data () {
    return {
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
  }
}
</script>
<style scoped>
 .sidenav{
    position: fixed;
    margin-left: 705px;
    width: 28%;
    top: 45%;
    overflow: auto;
}
 @media screen and (max-width: 650px){
   .sidenav{
     position: relative !important;
     margin-left: 0px !important;
     width: 100% !important;
     top: 2.5% !important;
    }
}
</style>



