<template>
  <vuestic-widget class="col-md-11">
    <form-wizard @on-complete="onComplete" title="" subtitle="" color="#4ae387">
      <tab-content title="Basic details"
                  icon="fa fa-user"
                  :before-change="personalCheck">
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.fname" id="fname" required/>
            <label class="control-label" for="fname">Company name</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.about" id="about" required/>
            <label class="control-label" for="about">About the company</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.uname" id="uname" required/>
            <label class="control-label" for="uname">User name</label><i class="bar"></i>
          </div>
        </div> 
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.website" id="website" required/>
            <label class="control-label" for="website">Website</label><i class="bar"></i>
          </div>
        </div> 
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.city" id="city" required/>
            <label class="control-label" for="city">City</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.country" id="country" required/>
            <label class="control-label" for="country">Country</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.zip" id="zip" type="number" required/>
            <label class="control-label" for="zip">ZIP code</label><i class="bar"></i>
          </div>
        </div>
      </tab-content>
      
      <tab-content title="Interests"
                    icon="fa fa-lightbulb-o">
        <div class="col-md-8">
          <multiselect></multiselect>
        </div>
      </tab-content>
    </form-wizard>
  </vuestic-widget>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import multiselect from './Multiselect'
  import { eventBus } from '../../../main.js'

  export default {
    name: 'postSignup',
    components: {
      FormWizard,
      TabContent,
      multiselect
    },
    data () {
      return {
        companyId: '',
        companyData: {
          tags: []
        },
        personalData: {
          fname: '',
          uname: '',
          about: '',
          city: '',
          country: '',
          website: '',
          zip: ''
        }
      }
    },
    methods: {
      onComplete: function () {
        this.updateCompany()
      },
      personalCheck: function () {
        // if (this.personalData.fname === '') {
        //   return false
        // }
        return true
      },
      updateCompany: function () {
        const self = this
        const authToken = this.$ls.get('token')
        this.companyData.profile = this.personalData
        this.$http.put('/companies/update', this.companyData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (companyDataUpdated) {
          self.$swal('Success!',
          'Your details are updated!',
          'success'
          ).then((result) => {
            if (result.value) {
              self.$router.push('/company/newsfeed')
            }
          })
        })
        .catch(function (companyDataUpdateErr) {
          console.log('company data update err', companyDataUpdateErr)
        })
      }
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
      eventBus.$on('multiselectorproject', (data) => {
        data.map(tag => {
          self.companyData.tags.push(tag.id)
        })
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
