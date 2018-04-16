<template>
  <div class="login">
    <h2>{{'auth.welcome' | translate}} Company</h2>
    <form method="post" @submit.prevent="sendLoginData" name="companylogin">
      <div class="form-group">
        <div class="input-group">
          <input type="text" v-model="loginData.email" id="email" required="required"/>
          <label class="control-label" for="email">Username</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" v-model="loginData.password" id="password" required="required"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">
          {{'auth.login' | translate}}
        </button>
        <router-link class='link' :to="{name: 'companysignup'}">{{'auth.createAccount' | translate}}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'companyLogin',
    data () {
      return {
        loginData: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      sendLoginData: function () {
        console.log('data da:', this.loginData.email, this.loginData.password)
        if (this.loginData.email === 'info@spritle.com' && this.loginData.password === 'spritle') {
          this.$router.push('/company/newsfeed')
        }
      }
    }

  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }
</style>
