<template>
  <div class="dashboard">

    <dashboard-info-widgets></dashboard-info-widgets>

    <div class="row">
      <div class="col-md-8">
        <vuestic-widget class="">
         
        </vuestic-widget>
      </div>
      <div class="col-md-4">
        <vuestic-widget class="" headerText="Live feeds">
          <vuestic-feed :initialPosts="posts"></vuestic-feed>
        </vuestic-widget>
      </div>
    </div>


  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'

  export default {
    name: 'dashboard',
    components: {
      DashboardInfoWidgets
    },
    data () {
      return {
        posts: [
        {
          photoURL: "https://goo.gl/iHPU9a",
          name: "HS",
          text: "registered for a contest"
        },
        {
          photoURL: "https://goo.gl/1nKusR",
          name: "Balaji",
          text: "upvoted for a project"
        }
      ]
      }
    },

    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  .vuestic-header{
    font-size: 1rem !important;
  }

</style>
