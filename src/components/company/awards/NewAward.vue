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
            <input id="simple-input" v-model="awardData.studentname" required/>
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
          <h4>Your award has been published</h4>
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
          studentname: '',
          description: '',
          files: [],
          tags: []
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
              return true
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
              return true
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
              return true
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
              return true
            },
            onBack: () => {
            }
          },
          {
            label: 'Confirmation',
            slot: 'page6',
            onNext: () => {
              console.log('this projectdata', this.projectData)
              this.$http.post('http://localhost:3000/projects/new', this.projectData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(function (projectCreationSuccess) {
                console.log('projectCreation success', projectCreationSuccess)
              })
              .catch(function (projectCreationError) {
                console.log('projectcreation error', projectCreationError)
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
        this.$router.push('/company/contests')
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
      eventBus.$on('multiselectoraward', (data) => {
        console.log('inside multiselector', data)
        this.projectData.tags = data
      })
      eventBus.$on('uploadedFileAwards', (data) => {
        console.log('inside upload file awards', data)
        this.projectData.files = data
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
