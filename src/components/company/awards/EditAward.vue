<template>
  <div>
    <button class="btn btn-danger backbtn" @click="sendBack">
        <i class="fa fa-caret-left"></i>
        Back
    </button>
    <vuestic-alert type="danger" :withCloseBtn="true" v-show="errorAlert">
      <span class="badge badge-pill badge-danger">Error</span>
      {{this.errorMessage}}
    </vuestic-alert> 
    <vuestic-alert type="info" :withCloseBtn="true" v-show="infoAlert">
      <span class="badge badge-pill badge-info">Tips</span>
      {{this.errorMessage}}
    </vuestic-alert> 
    <vuestic-wizard 
     :steps="vrSteps" 
     wizard-layout="horizontal" 
     wizard-type="simple"
     class="new">

     <div slot="page1" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
              <input id="simple-input" v-model="awardData.title" required/>
              <label class="control-label" for="simple-input">Name of the award</label><i class="bar"></i>
          </div>
        </div> 
     </div>
     <div slot="page2" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
            <input id="simple-input" v-model="awardData.student" required/>
            <label class="control-label" for="simple-input">Select student</label><i class="bar"></i>
          </div>
        </div>    
     </div>
     <div slot="page3" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
            <textarea type="text" id="simple-textarea" v-model="awardData.description" required></textarea>
            <label class="control-label" for="simple-textarea">Description about the award</label><i class="bar"></i>
          </div>
        </div>
     </div>
     <div slot="page4" class="form-wizard-tab-content">
        <upload></upload>
     </div>
     <div slot="page5" class="form-wizard-tab-content">
       <multiselect></multiselect>
     </div>
     <div slot="page6" class="form-wizard-tab-content">
       <h4>Are you sure to submit?</h4>
     </div>
     <div slot="wizardCompleted" class="form-wizard-tab-content">
          <h4>Your award has been updated</h4>
          <button class="btn btn-info" @click="sendBack">
              <i class="fa fa-home"></i>
              Awards Home
          </button>
     </div>
</vuestic-wizard>

  </div>



</template>

<script>
  import multiselect from './Multiselect'
  import { eventBus } from '../../../main.js'
  import upload from './Upload'
  
  export default {
    name: 'newContest',
    components: {
      multiselect,
      upload
    },
    data () {
      return {
        awardData: {
          title: '',
          student: '',
          description: '',
          files: [],
          tags: [],
          company: ''
        },
        counter: 0,
        errorMessage: '',
        errorAlert: false,
        infoAlert: false,
        vrSteps: [
          {
            label: 'Title',
            slot: 'page1',
            onNext: () => {
            },
            isValid: () => {
              if (this.awardData.title === '') {
                this.showError('show')
                this.errorMessage = 'The Title field can\'t be empty'
                return false
              } else {
                return true
              }
            },
            onBack: () => {
            }
          },
          {
            label: 'Student',
            slot: 'page2',
            onNext: () => {
            },
            isValid: () => {
              const studentEmail = this.awardData.student
              const token = this.$ls.get('token')
              const self = this
              if (studentEmail === '') {
                this.showError('show')
                this.errorMessage = 'Student\'s email address is mandatory'
                return false
              } else {
                this.$http.get('/students/all', {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                })
                .then(function (studentsData) {
                  console.log('studentData', studentsData.data.students)
                  if (studentsData.data.students.filter((student) => { return studentEmail === student.email }).length > 0) {
                    console.log('matched')
                    return true
                  } else {
                    console.log('dint match')
                    self.showError('show')
                    self.errorMessage = 'The email provided is not associated with any student'
                    return false
                  }
                })
                .catch(function (studentsErr) {
                  console.log('students err', studentsErr)
                })
                return true
              }
            },
            onBack: () => {
            }
          },
          {
            label: 'Description',
            slot: 'page3',
            onNext: () => {
            },
            isValid: () => {
              if (this.awardData.description === '') {
                this.showError('show')
                this.errorMessage = 'The description can\'t be empty'
                return false
              } else {
                return true
              }
            },
            onBack: () => {
            }
          },
          {
            label: 'Certificate',
            slot: 'page4',
            onNext: () => {
            },
            isValid: () => {
              if (this.awardData.files.length === 0) {
                if (this.counter === 0) {
                  this.errorMessage = 'A certificate/letter talks for a student more than a post. You sure you don\'t want to proceed without them?'
                  this.counter++
                  this.showInfo('show')
                  return false
                }
                return true
              }
              return true
            },
            onBack: () => {
            }
          },
          {
            label: 'Tags',
            slot: 'page5',
            onNext: () => {
            },
            isValid: () => {
              if (this.awardData.tags.length === 0) {
                this.showError('show')
                this.errorMessage = 'The tags need to be selected'
                return false
              } else {
                return true
              }
            },
            onBack: () => {
            }
          },
          {
            label: 'Confirmation',
            slot: 'page6',
            onNext: () => {
              console.log('this awarddata', this.awardData)
              const authToken = this.$ls.get('token')
              this.$http.put('/awards/update', this.awardData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + authToken
                }
              })
              .then(function (awardCreationSuccess) {
                console.log('award creation success', awardCreationSuccess)
              })
              .catch(function (awardCreationError) {
                console.log('award creation error', awardCreationError)
              })
            },
            isValid: () => {
              return true
            },
            onBack: () => {
            }
          }
        ]
      }
    },
    methods: {
      sendBack: function () {
        this.$router.push('/company/awards')
      },
      showError (nudge) {
        if (nudge === 'show') {
          console.log('yes show')
          this.errorAlert = false
          this.errorAlert = true
          const self = this
          setTimeout(() => {
            self.errorAlert = false
          }, 3000)
        } else {
          console.log('this is not show')
        }
      },
      showInfo (nudge) {
        if (nudge === 'show') {
          console.log('yes show')
          this.infoAlert = true
        } else {
          console.log('this is not show')
        }
      }
    },
    created () {
      const self = this
      eventBus.$on('multiselectoraward', (data) => {
        console.log('inside multiselector', data)
        this.awardData.tags = data
      })
      eventBus.$on('uploadedFileAwards', (data) => {
        console.log('inside upload file awards', data)
        this.awardData.files = data.response.filepath
      })
      this.awardData.title = eventBus.awardToBeEdited.title
      this.awardData.description = eventBus.awardToBeEdited.description
      this.awardData.tags = eventBus.awardToBeEdited.tags
      this.awardData.files = eventBus.awardToBeEdited.files
      this.awardData._id = eventBus.awardToBeEdited._id
      console.log('award data to be edited', eventBus.awardToBeEdited)
      const authToken = this.$ls.get('token')
      this.$http.get('/students/get?id=' + eventBus.awardToBeEdited.receiver, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (studentData) {
        console.log('student data', studentData.data[0].email)
        self.awardData.student = studentData.data[0].email
      })
      .catch(function (studentDataErr) {
        console.log('studnet data err', studentDataErr)
      })
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style lang="scss">
  .new{
    background-color: white;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .backbtn{
    margin-bottom: 1rem;
    padding: 0.8rem 1.9rem;
    border-radius: 5%;
  }
</style>