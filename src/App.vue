<template>
  <div id="app" class="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <landing v-else-if="isLanding"></landing>
    <layout v-else></layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import AuthLayout from 'components/layout/AuthLayout'
  import VuesticPreLoader from 'vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  import Landing from 'components/landing/Landing.vue'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout,
      Landing
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      },
      isLanding () {
        return this.$route.path.match('root')
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    #app {
      height: 100%;
    }
  }
</style>
