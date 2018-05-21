<template>
  <vuestic-widget class="col-md-11">
    <form-wizard @on-complete="onComplete">
     <tab-content title="Personal details"
                  icon="ti-user"
                  :before-change="validateAsync">
       My first tab content
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
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
        counter: 0,
        companyId: '',
        companyData: {
          tags: []
        }
      }
    },
    methods: {
      onComplete: function () {
        alert('Yay. Done!')
      },
      validateAsync: function () {
        if (this.counter === 0) {
          this.counter ++
          console.log('its false')
          return false
        } else {
          return true
        }
      },
      updateCompany: function () {
        const authToken = this.$ls.get('token')
        this.companyData.tags = [
          '5afce716bd80c12133c8d443',
          '5afce69ebd80c12133c8d43a'
        ]
        console.log('this company data from update company', this.companyData)
        this.$http.put('/companies/update', this.companyData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (companyDataUpdated) {
          console.log('company data updated', companyDataUpdated)
        })
        .catch(function (companyDataUpdateErr) {
          console.log('company data update err', companyDataUpdateErr)
        })
      }
    },
    mounted () {
      // const self = this
      // setTimeout(() => {
      //   self.updateCompany()
      // }, 3000)
    },
    created () {
      const self = this
      const authToken = this.$ls.get('token')
      const email = this.$ls.get('email')
      this.$http.get('/companies/get?email=' + email, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (companyData) {
        console.log('company data', companyData)
        self.companyData = companyData.data[0]
        console.log('company data main', self.companyData)
      })
      .catch(function (companyDataErr) {
        console.log('company data err', companyDataErr)
      })
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
