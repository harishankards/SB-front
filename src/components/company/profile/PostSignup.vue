<template>
  <vuestic-widget class="col-md-11">
    <form-wizard @on-complete="onComplete" title="" subtitle="" color="#4ae387">
      <tab-content title="Basic details"
                  icon="fa fa-user"
                  :before-change="personalCheck">
        <div class="form-inline">
          <div class="col-md-6">  
          <h6 class="labelStyle">Company Name:</h6>  
            <input type="text" class="inputboxStyle" v-model="personalData.fname" id="fname" required/>
          </div>
        </div>
        <div class="form-inline">
          <div class="col-md-6">  
            <h6 class="labelStyle">About Company:</h6>        
            <input type="text" class="inputboxStyle" v-model="personalData.about" id="about" required/>
          </div>
        </div>
        <div class="form-inline">
          <div class="col-md-6">
            <h6 class="labelStyle">Username:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.uname" id="uname" required/>
          </div>
        </div> 
        <div class="form-inline">
          <div class="col-md-6">
            <h6 class="labelStyle">Website:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.website" id="website" required/>
          </div>
        </div> 
        <div class="form-inline">
          <div class="col-md-6">
            <h6 class="labelStyle">City:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.city" id="city" required/>
          </div>
        </div>
        <div class="form-inline">
          <div class="col-md-6">
            <h6 class="labelStyle">Country:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.country" id="country" required/>
          </div>
        </div>
        <div class="form-inline">
          <div class="col-md-6">
            <h6 class="labelStyle">Zip Code:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.zip" id="zip" required/>
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
@import "../../../sass/_variables.scss";
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
  .inputboxStyle{
    margin-top: 3%;
    font-size: 15px;
    width: 16rem;
    padding: 8px 25px;
    border: 1px solid #bdc7d8;
    border-radius: 5px;
    color:#333;
  }
  .labelStyle{
    color: $vue-green;
    margin-top: 3%;
    text-align: left;
  }
</style>
