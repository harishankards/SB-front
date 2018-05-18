<template>
  <vuestic-widget>
    <form-wizard @on-complete="onComplete"
                  @on-loading="setLoading"
                  @on-validate="handleValidation"
                  @on-error="handleErrorMessage"
                  shape="circle"
                  color="gray"
                  error-color="#e74c3c">
      <tab-content title="Personal details"
                  :before-change="validateAsync"
                  icon="ti-user">
              First tab
      </tab-content>
      <tab-content title="Additional Info"
                  icon="ti-settings">
              Second tab
      </tab-content>
      <tab-content title="Last step"
                  icon="ti-check">
              Third tab
      </tab-content>

      <div class="loader" v-if="loadingWizard"></div>
      <div v-if="errorMsg">
        <span class="error">{{errorMsg}}</span>
      </div>
    </form-wizard>
  </vuestic-widget>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  export default {
    name: 'postSignup',
    components: {
      FormWizard,
      TabContent
    },
    data () {
      return {
        loadingWizard: false,
        errorMsg: null,
        count: 0
      }
    },
    methods: {
      onComplete: function () {
        alert('Yay. Done!')
      },
      setLoading: function (value) {
        this.loadingWizard = value
      },
      handleValidation: function (isValid, tabIndex) {
        console.log('Tab: ' + tabIndex + ' valid: ' + isValid)
      },
      handleErrorMessage: function (errorMsg) {
        this.errorMsg = errorMsg
      },
      validateAsync: function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (this.count < 1) {
              this.count ++
              reject(new Error('This is a custom validation error message. Click next again to get rid of the validation'))
            } else {
              this.count = 0
              resolve(true)
            }
          }, 1000)
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .align-gender {
    padding-left: 1rem;
  }
  .new{
    background-color: white;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
  span.error{
    color:#e74c3c;
    font-size:20px;
    display:flex;
    justify-content:center;
  }

</style>
