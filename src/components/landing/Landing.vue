<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center landing-parent">
      <div class="col-md-6">
        <h3 class="col-md-8 offset-2">Welcome to Student Burger</h3>
      </div>
      <div class="col-md-12">
        <h2 class="col-md-6 offset-5">Are you a?</h2>
        <div class="button-div col-md-6 offset-3">

          <button @click="student" class="btn btn-primary btn-with-icon">
            <div class="btn-with-icon-content">
              <i class="fa fa-graduation-cap"></i>
              Student
            </div>
          </button>
        <!-- <router-link class="i-vuestic" :to="{path: '/auth/login'}">  -->
        
          <button @click="company" class="btn btn-primary btn-with-icon">
            <div class="btn-with-icon-content">
              <i class="fa fa-building"></i>
              Company
            </div>
          </button>
        <!-- </router-link> -->
        </div>
        
      </div>
          <a href="" class="linkStyle" @click.prevent="changeLog()">Release Notes</a>
    </div>
  </div>
</template>

<script>
  import Changelog from '../public/Changelog'
  export default {
    name: 'landing',
    components: {
      Changelog
    },
    methods: {
      student: function () {
        this.$store.state.category = 'student'
        console.log('clicked student components', this.$store.state.category)
        this.$router.push('/auth/student/login')
      },
      company: function () {
        this.$store.state.category = 'company'
        this.$router.push('/auth/company/login')
      },
      changeLog: function () {
        this.$router.push('/changelog')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .h-100 {
      height: 100vh !important;
  }
  .landing-parent{
    align-items: baseline;
  }
  .btn.btn-with-icon {
    position: relative;
    padding: 1.1rem 3.8125rem;
  }
  .linkStyle{
    text-align: center;
  }
</style>

