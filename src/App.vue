<template>
  <div id="app" class="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <landing v-else-if="isLanding"></landing>
    <company-newsfeed v-else-if="isCompany"></company-newsfeed>
    <layout v-else></layout>
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import AuthLayout from 'components/layout/AuthLayout'
  import VuesticPreLoader from 'vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  import Landing from 'components/landing/Landing.vue'
  import CompanyNewsfeed from 'components/company/Newsfeed'

  export default {
    name: 'app',
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout,
      Landing,
      CompanyNewsfeed
    },
    computed: {
      isAuth () {
        return this.$route.path.match('auth')
      },
      isLanding () {
        console.log('this route name', this.$route.name)
        return this.$route.name === 'landing'
      },
      isCompany () {
        return this.$route.name === 'companyNewsfeed'
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
