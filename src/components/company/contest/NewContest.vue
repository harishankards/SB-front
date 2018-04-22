<template>
  <div>
    <button class="btn btn-danger backbtn" @click="sendBack">
        <i class="fa fa-caret-left"></i>
        Back
    </button>
    <vuestic-wizard 
     :steps="vrSteps" 
     wizard-layout="horizontal" 
     wizard-type="simple"
     class="new">

     <div slot="page1" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
              <input id="simple-input" v-model="projectData.title" required/>
              <label class="control-label" for="simple-input">Name of the contest</label><i class="bar"></i>
          </div>
        </div> 
     </div>
     <div slot="page2" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
            <textarea type="text" id="simple-textarea" v-model="projectData.abstract" required></textarea>
            <label class="control-label" for="simple-textarea">About the contest</label><i class="bar"></i>
          </div>
        </div>    
     </div>
     <div slot="page3" class="form-wizard-tab-content">
         <editor></editor>
     </div>
     <div slot="page4" class="form-wizard-tab-content">
     </div>
     <div slot="page5" class="form-wizard-tab-content">
       <multiselect></multiselect>
       
     </div>
     <div slot="page6" class="form-wizard-tab-content">
       <h4>Are you sure to submit?</h4>
     </div>
     <div slot="wizardCompleted" class="form-wizard-tab-content">
          <h4>Your project has been created</h4>
     </div>
</vuestic-wizard>

  </div>



</template>

<script>
  import Multiselect from './Multiselect'
  import Editor from './Editor'
  export default {
    name: 'newContest',
    components: {
      Multiselect,
      Editor
    },
    props: ['content'],
    data () {
      return {
        projectData: {
          title: '',
          abstract: '',
          description: '',
          files: ''
          // tags: this.props.content
        },
        vrSteps: [
          {
            label: 'Title',
            slot: 'page1', // the same name as in attribute "slot" of wizard's step
            onNext: () => {
              // method is called when moving to the next step
            },
            isValid: () => {
              // condition for moving to the next step
              return true
            },
            onBack: () => {
              // method is called when moving to the previous step
            }
          },
          {
            label: 'About',
            slot: 'page2', // the same name as in attribute "slot" of wizard's step
            onNext: () => {
              // method is called when moving to the next step
            },
            isValid: () => {
              // condition for moving to the next step
              return true
            },
            onBack: () => {
              // method is called when moving to the previous step
            }
          },
          {
            label: 'Rules & Format',
            slot: 'page3', // the same name as in attribute "slot" of wizard's step
            onNext: () => {
              // method is called when moving to the next step
              console.log('project desc', this.projectData.description)
            },
            isValid: () => {
              // condition for moving to the next step
              return true
            },
            onBack: () => {
              console.log('project desc', this.projectData.description)
              // method is called when moving to the previous step
            }
          },
          {
            label: 'Date',
            slot: 'page4', // the same name as in attribute "slot" of wizard's step
            onNext: () => {
              // method is called when moving to the next step
            },
            isValid: () => {
              // condition for moving to the next step
              return true
            },
            onBack: () => {
              // method is called when moving to the previous step
            }
          },
          {
            label: 'Tags',
            slot: 'page5', // the same name as in attribute "slot" of wizard's step
            onNext: () => {
              // method is called when moving to the next step
            },
            isValid: () => {
              // condition for moving to the next step
              return true
            },
            onBack: () => {
              // method is called when moving to the previous step
            }
          },
          {
            label: 'Confirmation',
            slot: 'page6', // the same name as in attribute "slot" of wizard's step
            onNext: () => {
              console.log('this projectdata', this.projectData)
              // method is called when moving to the next step
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
              // condition for moving to the next step
              return true
            },
            onBack: () => {
              // method is called when moving to the previous step
            }
          }
        ]
      }
    },
    methods: {
      sendBack: function () {
        this.$router.push('/company/contests')
      }
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
