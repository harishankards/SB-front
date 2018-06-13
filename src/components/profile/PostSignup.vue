<template>
  <vuestic-widget class="col-md-11">
    <form-wizard @on-complete="onComplete" title="" subtitle="" color="#4ae387">
      <tab-content title="Personal details"
                  icon="fa fa-user"
                  :before-change="() => personalCheck('first')">
      <div class="form-inline">
          <div class="col-md-6">   
            <h6 class="labelStyle">First Name:</h6>           
            <input type="text" class="inputboxStyle" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('Firstname') }" name="Firstname" v-model="personalData.fname" id="fname"/><br>            
            <i v-show="errors.has('first.Firstname')" class="fa fa-warning"></i>
            <span v-show="errors.has('first.Firstname')" class="help is-danger">{{ errors.first('Firstname') }}</span>
          </div>
          <div class="col-md-6">
             <h6 class="labelStyle">Last Name:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.lname" id="lname" required/>
          </div>
          </div>
          <div class="form-inline">
        <div class="col-md-6">
          <h6 class="labelStyle">Username:</h6>
            <input type="text" class="inputboxStyle" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('first.Username') }" name="Username" v-model="personalData.uname" id="uname"/><br>
            <i v-show="errors.has('first.Username')" class="fa fa-warning"></i>
            <span v-show="errors.has('first.Username')" class="help is-danger">{{ errors.first('first.Username') }}</span>
        </div></div>
        <div class="form-inline">
         <div class="col-md-6">      
         <h6 class="labelStyle">Date Of Birth:</h6>
         <input type="text" class="inputboxStyle" id="dob" v-validate="'required'" name="Date" :class="{'input': true, 'is-danger': errors.has('first.Date') }" v-model="personalData.dob" placeholder="DD-MM-YYYY" /><br>
          <i v-show="errors.has('first.Date')" class="fa fa-warning"></i>
          <span v-show="errors.has('first.Date')" class="help is-danger">{{ errors.first('first.Date') }}</span>
       </div></div>
       <div class="form-inline">
        <div class="col-md-6"> 
          <h6 class="labelStyle">Gender:</h6>
          <label class="radio inline">
          <input type="radio" name="gender" value="male" id="gender-male"/>
          <span>Male</span></label>
          <label class="radio inline">
          <input type="radio" name="gender" value="female" id="gender-female"/>
          <span>Female</span></label>
          <label class="radio inline">
          <input type="radio" name="gender" value="others" id="gender-others"/>
          <span>Others</span></label>
        </div>
        </div> 
        <div class="form-inline">
        <div class="col-md-6">
          <h6 class="labelStyle">City:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.city" id="city" required/>
        </div></div>
        <div class="form-inline">
        <div class="col-md-6">
          <h6 class="labelStyle">Country:</h6>
            <input type="text" class="inputboxStyle" v-model="personalData.country" id="country" required/>          
        </div></div>
      </tab-content>
      
      <tab-content title="Academic details"
                    icon="fa fa-mortar-board">
        <div class="form-inline">
        <div class="col-md-6">
            <h6 class="labelStyle">College Name:</h6>
            <input type="text" class="inputboxStyle" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('CollegeName') }" name="CollegeName" v-model="academicData.collegeName" id="collegeName" required/>
            <i v-show="errors.has('CollegeName')" class="fa fa-warning"></i>
            <span v-show="errors.has('CollegeName')" class="help is-danger">{{ errors.first('CollegeName') }}</span>
          </div>
        </div>
        <div class="form-inline">
        <div class="col-md-6">
          <h6 class="labelStyle">Degree:</h6>
            <input type="text" class="inputboxStyle" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('Degree') }" name="Degree" v-model="academicData.degree" id="degree" required/>
          <i v-show="errors.has('Degree')" class="fa fa-warning"></i>
            <span v-show="errors.has('Degree')" class="help is-danger">{{ errors.first('Degree') }}</span>
          </div>
        </div>
        <div class="form-inline">
        <div class="col-md-6"> 
            <h6 class="labelStyle">Branch:</h6>
            <input type="text" class="inputboxStyle" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('Branch') }" name="Branch" v-model="academicData.branch" id="branch" required/>
          <i v-show="errors.has('Branch')" class="fa fa-warning"></i>
            <span v-show="errors.has('Branch')" class="help is-danger">{{ errors.first('Branch') }}</span>
          </div>
        </div>
        <div class="form-inline">
        <div class="col-md-6">
             <h6 class="labelStyle">Year Of Study:</h6>         
            <input type="text" class="inputboxStyle" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('YearOfStudy') }" name="YearOfStudy" v-model="academicData.yearofstudy" id="yearofstudy" required/>
          <i v-show="errors.has('YearOfStudy')" class="fa fa-warning"></i>
            <span v-show="errors.has('YearOfStudy')" class="help is-danger">{{ errors.first('YearOfStudy') }}</span>
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
  import { eventBus } from '../../main.js'

  export default {
    name: 'postSignup',
    components: {
      FormWizard,
      TabContent,
      multiselect
    },
    data () {
      return {
        studentId: '',
        studentData: {
          tags: []
        },
        personalData: {
          fname: '',
          lname: '',
          dob: null,
          uname: '',
          city: '',
          country: ''
        },
        academicData: {
          collegeName: '',
          degree: '',
          branch: '',
          yearofstudy: ''
        }
      }
    },
    methods: {
      onComplete: function () {
        this.updateStudent()
      },
      personalCheck: function (scope) {
        this.$validator.validateAll(scope)
        if (this.errors.any()) {
          console.log('there are errors in the personal details tab', this.errors)
          return false
        } else {
          return true
        }
      },
      updateStudent: function () {
        const self = this
        const authToken = this.$ls.get('token')
        this.studentData.profile = this.personalData
        this.studentData.academic = this.academicData
        console.log('this student data from update student', this.studentData, this.personalData, this.academicData)
        this.$http.put('/students/update', this.studentData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (studentDataUpdated) {
          self.$swal('Success!',
          'Your details are updated!',
          'success'
          ).then((result) => {
            if (result.value) {
              self.$router.push('/student/newsfeed')
            }
          })
        })
        .catch(function (studentDataUpdateErr) {
          console.log('student data update err', studentDataUpdateErr)
        })
      }
    },
    mounted () {
      // const self = this
      // setTimeout(() => {
      //   self.updateStudent()
      // }, 3000)
    },
    created () {
      const self = this
      const authToken = this.$ls.get('token')
      const email = this.$ls.get('email')
      this.$http.get('/students/get?email=' + email, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (studentData) {
        console.log('student data', studentData)
        self.studentData = studentData.data[0]
        console.log('student data main', self.studentData)
      })
      .catch(function (studentDataErr) {
        console.log('student data err', studentDataErr)
      })
      eventBus.$on('multiselectorproject', (data) => {
        data.map(tag => {
          self.studentData.tags.push(tag.id)
        })
      })
    }
  }
</script>


<style lang="scss" scoped>
 @import "../../sass/_variables.scss";
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
  .inline{
  display: inline-block;
  }
  .inline + .inline{
  margin-left:10px;
  }
  .radio{
  font-size:17px;
  position:relative;
}
.radio span{
  position:relative;
  padding-left:20px;
}
.radio span:after{
  content:'';
  width:15px;
  height:15px;
  border:3px solid;
  position:absolute;
  left:0;
  top:1px;
  border-radius:100%;
  -ms-border-radius:100%;
  -moz-border-radius:100%;
  -webkit-border-radius:100%;
  box-sizing:border-box;
  -ms-box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
}
.radio input[type="radio"]{
   cursor: pointer; 
  position:absolute;
  width:100%;
  height:100%;
  z-index: 1;
  opacity: 0;
  filter: alpha(opacity=0);
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
}
.radio input[type="radio"]:checked + span{
  color: $vue-green;  
}
.radio input[type="radio"]:checked + span:before{
  content:'';
  width:5px;
  height:5px;
  position:absolute;
  background: $vue-green;
  left:5px;
  top:6px;
  border-radius:100%;
  -ms-border-radius:100%;
  -moz-border-radius:100%;
  -webkit-border-radius:100%;
}
.errmsg{
  color: red;
}
</style>
