<template>
  <div id="app" class="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <landing v-else-if="isLanding"></landing>
    <not-found v-else-if="isNotFound"></not-found>
    <layout v-else ></layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import AuthLayout from 'components/layout/AuthLayout'
  import VuesticPreLoader from 'vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  import Landing from 'components/landing/Landing.vue'
  import NotFound from 'components/404/NotFound'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout,
      Landing,
      NotFound
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      },
      isLanding () {
        return this.$route.name === 'landing'
      },
      isNotFound () {
        console.log('this route name', this.$route.name)
        return this.$route.name === '404'
      }
    },
    created () {
      this.$store.state.loginToastCounter = 0
      this.$socket.on('project created', (data) => {
        console.log('data from project created', data)
      })
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
