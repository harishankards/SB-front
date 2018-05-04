<template>
  <div class="signup">
    <h2>{{'auth.createNewAccount' | translate}}</h2>
    <form method="post" name="studentsignup" @submit.prevent="sendSignupData">
      <div class="form-group">
        <div class="input-group">
          <input type="text" v-model="signupData.email" id="email" v-validate="'required|email'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" required="required"/>
          <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
          <i v-show="errors.has('email')" class="fa fa-warning"></i>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" v-model="signupData.password" id="password" required="required"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-check abc-checkbox abc-checkbox-primary">
        <input class="form-check-input" id="checkbox1" type="checkbox" checked>
        <label class="form-check-label" for="checkbox1">
          <span class="abc-label-text">{{'auth.agree' | translate}} <router-link to="">{{'auth.termsOfUse' | translate}}</router-link></span>
        </label>
      </div>
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">
          {{'auth.signUp' | translate}}
        </button>
        <router-link class='link' :to="{name: 'studentlogin'}">{{'auth.alreadyJoined' | translate}}</router-link>
      </div>
    </form>
    <div class="col-md-12">
      <h2 class="ortext">or</h2>
      <button class="btn btn-info fbbtn"><i class="fa fa-facebook-official"></i>  Sign up with Facebook</button>
      <!-- <button class="btn btn-dark ghbtn"><i class="fa fa-github"></i> Sign up with  Github</button> -->
      <button class="btn btn-danger libtn"><i class="fa fa-linkedin-square"></i> Sign up with Linkedin</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'signup',
    data () {
      return {
        signupData: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      sendSignupData: function () {
        var secondThis = this
        console.log('data:', this.signupData.email, this.signupData.password)
        console.log('going to send post request')
        this.$http.post('/student/signup', this.signupData)
        .then(function (signupSuccess) {
          console.log('signup success', signupSuccess.data)
          const authToken = signupSuccess.data.token
          secondThis.$ls.set('token', authToken)
          secondThis.$ls.set('student', 'true')
          secondThis.$ls.set('email', secondThis.signupData.email)
          secondThis.$store.dispatch('login')
          secondThis.$router.push('/student/postsignup')
        })
        .catch(function (signupError) {
          console.log('signuperror', signupError)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import '../../../../node_modules/bootstrap/scss/variables';

  .signup {
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
      margin-top: 2.6875rem;
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
