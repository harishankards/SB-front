<template>
  <div class="login">
    <h2>{{'auth.welcome' | translate}} Company</h2>
     <vuestic-alert type="danger" :withCloseBtn="true" v-show="errorAlert">
      <span class="badge badge-pill badge-danger">Error</span>
      {{this.errorMessage}}
    </vuestic-alert>
    <form method="post" @submit.prevent="sendLoginData" name="companylogin">
      <div class="form-group">
        <div class="input-group">
          <input type="text" v-validate="'required|email'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" v-model="loginData.email" id="email" required="required"/>
          <label class="control-label" for="email">Username</label><i class="bar"></i>
          <i v-show="errors.has('email')" class="fa fa-warning"></i>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
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
    <div class="col-md-12">
      <h2 class="ortext">or</h2>
      <button class="btn btn-info fbbtn"><i class="fa fa-facebook-official"></i>  Sign in with Facebook</button>
      <!-- <button class="btn btn-dark ghbtn"><i class="fa fa-github"></i> Sign in with  Github</button> -->
      <button class="btn btn-danger libtn"><i class="fa fa-linkedin-square"></i> Sign in with Linkedin</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'companyLogin',
    data () {
      return {
        loginData: {
          email: '',
          password: ''
        },
        errorAlert: false,
        errorMessage: ''
      }
    },
    methods: {
      sendLoginData: function () {
        const secondThis = this
        console.log('company data :', this.loginData)
        axios({
          url: '/company/login',
          method: 'POST',
          data: this.loginData,
          responseType: 'json'
        })
        .then(function (loginSuccess) {
          console.log('login success', loginSuccess.data)
          const authToken = loginSuccess.data.token
          console.log('auth token', authToken)
          secondThis.$ls.set('token', authToken)
          secondThis.$ls.set('company', 'true')
          secondThis.$ls.set('email', secondThis.loginData.email)
          secondThis.$ls.set('logged_company_id', loginSuccess.data.id)
          secondThis.$ls.set('verified', loginSuccess.data.verified)
          console.log('set the tokens for company')
          secondThis.$store.dispatch('login')
          secondThis.$router.push('/company/newsfeed')
        })
        .catch(function (loginErr) {
          secondThis.errorMessage = 'Invalid email or password'
          secondThis.showError('show')
          console.log('login err', loginErr)
        })
      },
      showError (nudge) {
        if (nudge === 'show') {
          console.log('yes show')
          this.errorAlert = true
        } else {
          console.log('this is not show')
        }
      },
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
    }

  }
</script>

<style lang="scss" scoped>
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
  .ortext {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .fbbtn {
    margin-bottom: 1rem;
    padding: 0.8rem 1.9rem;
    border-radius: 2%;
  }

  .btn.btn-info {
    background-color: #3B5998;
  }

  .ghbtn {
    margin-bottom: 1rem;
    padding: 0.8rem 2.7rem;
    border-radius: 2%;
  }

  .btn.btn-danger {
    background-color: #0077b5    
  }

  .libtn {
    margin-bottom: 1rem;
    padding: 0.8rem 2.15rem;
    border-radius: 2%;
  }
</style>
