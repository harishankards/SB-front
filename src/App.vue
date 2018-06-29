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
  import { eventBus } from './main.js'
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
    methods: {
      checkState () {
        if (this.$store.state.isLoggedIn) {
          if (this.$store.state.student) {
            this.$router.push('/student/newsfeed')
          }
          if (this.$store.state.company) {
            this.$router.push('/company/newsfeed')
          }
        }
      }
    },
    beforeMount: function () {
      this.checkState()
    },
    created: function () {
      console.log('store', this.$store.state)
      const self = this
      let counter = 1
      this.$socket.on('project created', (data) => {
        counter++
        console.log('data from project created', data)
        self.$toasted.info('A project has been created' + counter, {
          position: 'top-right',
          duration: 3000,
          action: {
            text: 'Visit',
            onClick: (e, toastObject) => {
              self.$router.push('/student/contests')
            }
          }
        })
      })
    },
    updated () {
      const student = this.$ls.get('student')
      const company = this.$ls.get('company')
      const email = this.$ls.get('email')
      const token = this.$ls.get('token')
      if (student) {
        console.log('it is a student')
        this.$http.get('/students/get?email=' + email, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(function (studentData) {
          console.log('student data', studentData.data[0].notifications)
          eventBus.$emit('notificationData', studentData.data[0].notifications)
        })
        .catch(function (studentDataErr) {
          console.log('student data err', studentDataErr)
        })
      } else if (company) {
        console.log('it is a company')
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
