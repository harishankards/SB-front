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
              <input id="simple-input" v-model="contestData.title" required/>
              <label class="control-label" for="simple-input">Name of the contest</label><i class="bar"></i>
          </div>
        </div> 
     </div>
     <div slot="page2" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
            <textarea type="text" id="simple-textarea" v-model="contestData.about" required></textarea>
            <label class="control-label" for="simple-textarea">About the contest</label><i class="bar"></i>
          </div>
        </div>    
     </div>
     <div slot="page3" class="form-wizard-tab-content">
         <editor></editor>
     </div>
     <div slot="page4" class="form-wizard-tab-content">
          <v-date-picker
            mode='range'
            :min-date='new Date()'            
            v-model='contestData.date'>
        </v-date-picker>
     </div>
     <div slot="page5" class="form-wizard-tab-content">
       <multiselect></multiselect>
       
     </div>
     <div slot="page6" class="form-wizard-tab-content">
       <h4>Are you sure to submit?</h4>
     </div>
     <div slot="wizardCompleted" class="form-wizard-tab-content">
          <h4>Your contest has been updated</h4>
          <button class="btn btn-info" @click="sendBack">
              <i class="fa fa-home"></i>
              Contest Home
          </button>
     </div>
</vuestic-wizard>

  </div>



</template>

<script>
  import Multiselect from './Multiselect'
  import Editor from './Editor'
  import { eventBus } from '../../../main.js'
  export default {
    name: 'newContest',
    components: {
      Multiselect,
      Editor
    },
    props: ['content'],
    data () {
      return {
        contestData: {
          title: '',
          about: '',
          rulesFormat: '',
          date: {
            start: null,
            end: null
          },
          host: '',
          tags: ''
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
              if (this.contestData.title === '') {
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
            label: 'About',
            slot: 'page2',
            onNext: () => {
            },
            isValid: () => {
              if (this.contestData.about === '') {
                this.showError('show')
                this.errorMessage = 'The About field can\'t be empty'
                return false
              } else {
                return true
              }
            },
            onBack: () => {
            }
          },
          {
            label: 'Rules & Format',
            slot: 'page3',
            onNext: () => {
            },
            isValid: () => {
              if (this.contestData.rulesFormat === '') {
                this.showError('show')
                this.errorMessage = 'The Rules and Formats can\'t be empty'
                return false
              } else {
                return true
              }
            },
            onBack: () => {
            }
          },
          {
            label: 'Date',
            slot: 'page4',
            onNext: () => {
              console.log('this date', this.contestData.date)
            },
            isValid: () => {
              if (this.contestData.date === '') {
                this.showError('show')
                this.errorMessage = 'The Date can\'t be empty'
                return false
              } else {
                return true
              }
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
              if (this.contestData.tags.length === 0) {
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
              const authToken = this.$ls.get('token')
              // this.contestData.host = this.$ls.get('email')
              console.log('this contestData', this.contestData)
              this.$http.put('http://localhost:3000/contests/update', this.contestData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + authToken
                }
              })
              .then(function (contestUpdationSuccess) {
                console.log('contestUpdationSuccess success', contestUpdationSuccess)
              })
              .catch(function (contestUpdationError) {
                console.log('contestUpdationError error', contestUpdationError)
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
      eventBus.$on('editorContentcontest', (data) => {
        this.contestData.rulesFormat = data
      })
      eventBus.$on('multiselectorcontest', (data) => {
        this.contestData.tags = data
      })
      this.contestData.title = eventBus.contestToBeEdited.title
      this.contestData.about = eventBus.contestToBeEdited.about
      this.contestData.files = eventBus.contestToBeEdited.files
      this.contestData.rulesFormat = eventBus.contestToBeEdited.rulesFormat
      this.contestData.date.start = eventBus.contestToBeEdited.date.start
      this.contestData.date.end = eventBus.contestToBeEdited.date.end
      this.contestData.tags = eventBus.contestToBeEdited.tags
      this.contestData._id = eventBus.contestToBeEdited._id
      this.contestData.host = eventBus.contestToBeEdited.host
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
