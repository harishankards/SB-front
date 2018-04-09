<template>
  <div class="dashboard">

    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-feed :initialPosts="posts">
      <!-- <div v-for="post in posts">
        <h1>Name: {{post.photoURL}}</h1>
      </div> -->
    </vuestic-feed>


  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'

  export default {
    name: 'dashboard',
    components: {
      DashboardInfoWidgets
    },
    data(){
      posts: [
        {
          photoURL: "URL of user's avatar",
          name: "Name of user",
          text: "Description",
        }]
    },

    methods: {
      launchEpicmaxToast () {
        this.showToast(`Let's work together!`, {
          icon: 'fa-star-o',
          position: 'top-right',
          duration: Infinity,
          action: {
            text: 'Hire us',
            href: 'http://epicmax.co/#/contact',
            class: 'vuestic-toasted-link'
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
