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
              <input id="simple-input" v-model="projectData.title" required/>
              <label class="control-label" for="simple-input">Name of the project</label><i class="bar"></i>
          </div>
        </div> 
     </div>
     <div slot="page2" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
            <textarea type="text" id="simple-textarea" v-model="projectData.abstract" required></textarea>
            <label class="control-label" for="simple-textarea">Abstract (2-3 lines max)</label><i class="bar"></i>
          </div>
        </div>    
     </div>
     <div slot="page3" class="form-wizard-tab-content">
        <editor v-model="projectData.description"></editor>
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
          <h4>Your project has been updated</h4>
          <button class="btn btn-info" @click="sendBack">
              <i class="fa fa-home"></i>
              Project Home
          </button>
     </div>
</vuestic-wizard>

  </div>



</template>

<script>
  import Multiselect from './Multiselect'
  import editor from './Editor'
  import upload from './Upload'
  import { eventBus } from '../../main.js'
  export default {
    name: 'newProject',
    components: {
      editor,
      Multiselect,
      upload
    },
    data () {
      return {
        projectData: {},
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
              if (this.projectData.title === '') {
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
            label: 'Abstract',
            slot: 'page2',
            onNext: () => {
            },
            isValid: () => {
              if (this.projectData.abstract === '') {
                this.showError('show')
                this.errorMessage = 'The Abstract field can\'t be empty'
                return false
              } else {
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
              if (this.projectData.description === '') {
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
            label: 'File upload',
            slot: 'page4',
            onNext: () => {
            },
            isValid: () => {
              if (this.projectData.files.length === 0) {
                if (this.counter === 0) {
                  this.errorMessage = 'Most of the projects yield attraction when having supporting images and PDFs. You sure you don\'t want to proceed without them?'
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
              if (this.projectData.tags.length === 0) {
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
              console.log('this projectdata', this.projectData)
              const authToken = this.$ls.get('token')
              this.$http.put('/projects/update', this.projectData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + authToken
                }
              })
              .then(function (projectUpdationSuccess) {
                console.log('projectUpdation success', projectUpdationSuccess)
              })
              .catch(function (projectUpdationError) {
                console.log('projectUpdation error', projectUpdationError)
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
        this.$router.push('/student/projects/project-list')
      },
      showError (nudge) {
        if (nudge === 'show') {
          console.log('yes show')
          this.errorAlert = true
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
      eventBus.$on('editorContentproject', (data) => {
        this.projectData.description = data
      })
      eventBus.$on('multiselectorproject', (data) => {
        this.projectData.tags = data
      })
      eventBus.$on('uploadedFile', (data) => {
        console.log('inside upload file', data)
        this.projectData.files.push(data)
      })
      this.projectData = eventBus.projectToBeEdited
      const secondthis = this
      const projectId = this.$route.params.id
      const authToken = this.$ls.get('token')
      this.projectId = projectId
      this.$http.get('projects/get?id=' + projectId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (projectDetails) {
        console.log('projectData', projectDetails.data)
        secondthis.projectData = projectDetails.data
        secondthis.$http.get('/students/get?id=' + projectDetails.data.author, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (studentData) {
          console.log('student data', studentData.data[0])
          secondthis.authorData = studentData.data[0]
          console.log('studet', secondthis.authorData.email)
        })
        .catch(function (studentDataErr) {
          console.log('student data err', studentDataErr)
        })
      })
      .catch(function (projectDataErr) {
        console.log('projectdataerr', projectDataErr)
      })
    },
    mounted () {
      // console.log('this proj desc', this.projectData.description)
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
