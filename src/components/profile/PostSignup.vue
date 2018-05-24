<template>
  <vuestic-widget class="col-md-11">
    <form-wizard @on-complete="onComplete" title="" subtitle="" >
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
        studentId: '',
        studentData: {
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
