<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center landing-parent">
      <div class="col-md-6">
        <h3 class="col-md-8 offset-2">Did you try to be smart?</h3>
      </div>
      <div class="col-md-12">
        <div class="button-div col-md-6 offset-5">
          <a href="#" @click.prevent="takeHome">
            <i class="fa fa-arrow-left"></i> Go back to home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notfound',
    methods: {
      takeHome () {
        if (this.$ls.get('student')) {
          this.$router.push('/student/newsfeed')
        } else if (this.$ls.get('company')) {
          this.$router.push('/company/newsfeed')
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>
