<template>
  <vuestic-widget class="col-md-11">
    <form-wizard @on-complete="onComplete" title="" subtitle="" color="#4ae387">
      <tab-content title="Personal details"
                  icon="fa fa-user"
                  :before-change="personalCheck">
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.fname" id="fname" required/>
            <label class="control-label" for="fname">First name</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="personalData.lname" id="lname" required/>
            <label class="control-label" for="lname">Last name</label><i class="bar"></i>
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
            <input v-model="personalData.dob" type="date" id="dob" required/>
            <label class="control-label" for="dob">Date of Birth</label><i class="bar"></i>
          </div>
        </div> 
        <div class="form-group col-md-4">
          Gender
          <div class="input-group">
            <label for="male">
              <input type="radio" id="male" name="gender">Male
            </label>
            <label for="female">
              <input type="radio" id="female" name="gender">Female              
            </label>
            <label for="others">
              <input type="radio" id="others" name="gender">Others              
            </label>
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
      </tab-content>
      
      <tab-content title="Academic details"
                    icon="fa fa-mortar-board">
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="academicData.collegeName" id="collegeName" required/>
            <label class="control-label" for="collegeName">College name</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="academicData.degree" id="degree" required/>
            <label class="control-label" for="degree">Degree</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="academicData.branch" id="branch" required/>
            <label class="control-label" for="branch">Branch</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group col-md-4">
          <div class="input-group">
            <input v-model="academicData.yearofstudy" type="number" id="yearofstudy" required/>
            <label class="control-label" for="yearofstudy">Year of Study</label><i class="bar"></i>
          </div>
        </div>
      </tab-content>
      <tab-content title="Interests"
                    icon="fa fa-lightbulb-o">
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
        alert('Yay. Done!')
      },
      personalCheck: function () {
        // if (this.personalData.fname === '') {
        //   return false
        // }
        return true
      },
      updateStudent: function () {
        const authToken = this.$ls.get('token')
        this.studentData.tags = [
          '5afce716bd80c12133c8d443',
          '5afce69ebd80c12133c8d43a'
        ]
        console.log('this student data from update student', this.studentData)
        this.$http.put('/students/update', this.studentData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (studentDataUpdated) {
          console.log('student data updated', studentDataUpdated)
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
