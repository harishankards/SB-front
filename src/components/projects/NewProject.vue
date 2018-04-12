<template>
    <vuestic-wizard 
     :steps="vrSteps" 
     wizard-layout="horizontal" 
     wizard-type="simple"
     class="new">

     <div slot="page1" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
              <input id="simple-input" required/>
              <label class="control-label" for="simple-input">Name of the project</label><i class="bar"></i>
          </div>
        </div> 
     </div>
     <div slot="page2" class="form-wizard-tab-content">
        <div class="form-group col-md-8">
          <div class="input-group">
            <textarea type="text" id="simple-textarea" required></textarea>
            <label class="control-label" for="simple-textarea">Abstract (2-3 lines max)</label><i class="bar"></i>
          </div>
        </div>    
     </div>
     <div slot="page3" class="form-wizard-tab-content">
        <editor></editor>
     </div>
     <div slot="page4" class="form-wizard-tab-content">
        <button class="btn btn-info btn-with-icon">
          <div class="btn-with-icon-content">
            <i class="ion-android-close ion"></i>
            Upload files
          </div>
        </button>
     </div>
     <div slot="wizardCompleted" class="form-wizard-tab-content">
          <h4>Add slot="wizardCompleted" to your wizard's last step,
           to show this step after wizard completed!</h4>
     </div>
</vuestic-wizard>


</template>

<script>
  import editor from './Editor'
  export default {
    name: 'newProject',
    components: {editor},
    data () {
      return {
        // how your steps should look like:
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
            }
          },
          {
            label: 'Abstract',
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
            label: 'Description',
            slot: 'page3', // the same name as in attribute "slot" of wizard's step
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
            label: 'File upload',
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
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  .new{
    background-color: white;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
