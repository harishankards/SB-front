<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center landing-parent">
      <div class="col-md-6">
        <h3 class="col-md-8 offset-2">Welcome to Student Burger</h3>
      </div>
      <div class="col-md-12">
        <h2 class="col-md-6 offset-5">Are you a?</h2>
        <div class="button-div col-md-6 offset-3">
        <router-link class="i-vuestic" :to="{path: '/auth/login'}"> 
          <button @click="student" class="btn btn-primary btn-with-icon">
            <div class="btn-with-icon-content">
              <i class="fa fa-graduation-cap"></i>
              Student
            </div>
          </button>
        </router-link>
        <router-link class="i-vuestic" :to="{path: '/auth/login'}"> 
        
          <button @click="company" class="btn btn-primary btn-with-icon">
            <div class="btn-with-icon-content">
              <i class="fa fa-building"></i>
              Company
            </div>
          </button>
        </router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'landing',
    methods: {
      student: function () {
        this.$store.state.category = 'student'
        console.log('clicked student components', this.$store.state.category)
      },
      company: function () {
        this.$store.state.category = 'company'
        console.log('clicked company components', this.$store.state.category)
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
</style>

