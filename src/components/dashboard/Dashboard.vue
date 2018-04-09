<template>
  <div class="dashboard">

    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-widget class="no-padding no-v-padding">
      
    </vuestic-widget>


  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'

  export default {
    name: 'dashboard',
    components: {
      DashboardInfoWidgets
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
