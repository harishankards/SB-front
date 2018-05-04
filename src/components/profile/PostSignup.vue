<template>
  <vuestic-widget>
    <vuestic-wizard 
      :steps="vrSteps" 
      wizard-layout="vertical" 
      wizard-type="simple">

      <div slot="page1" class="form-wizard-tab-content">
      <div class="form-group">
        <div class="input-group">
        <input id="simple-input" required/>
        <label class="control-label" for="simple-input">First Name</label><i class="bar"></i>
        </div>
      </div> 
      <div class="form-group">
        <div class="input-group">
        <input id="simple-input" required/>
        <label class="control-label" for="simple-input">Last Name</label><i class="bar"></i>
        </div>
      </div> 
      <div class="form-group">
        <div class="input-group">
        <input id="simple-input" required/>
        <label class="control-label" for="simple-input">Username</label><i class="bar"></i>
        </div>
      </div> 
      <div class="form-group align-gender">
        <div class="input-group">
          <div class="radio abc-radio abc-radio-primary">
            <input type="radio" name="male" id="male" value="male" checked>
            <label for="male">
              <span class="abc-label-text">Male</span>
            </label>
            <input type="radio" name="female" id="female" value="female">
            <label for="female">
              <span class="abc-label-text">Female</span>
            </label>
            <input type="radio" name="others" id="others" value="others">
            <label for="others">
              <span class="abc-label-text">Others</span>
            </label>
          </div>
        </div>
      </div>
      </div>
      <div slot="page2" class="form-wizard-tab-content">
        <div class="form-group">
          <div class="input-group">
            <input id="simple-input" required/>
            <label class="control-label" for="simple-input">College Name</label><i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input id="simple-input" required/>
            <label class="control-label" for="simple-input">University</label><i class="bar"></i>
          </div>
        </div> 
      </div>
      <div slot="wizardCompleted" class="form-wizard-tab-content">
            <h4>Add slot="wizardCompleted" to your wizard's last step,
            to show this step after wizard completed!</h4>
      </div>
    </vuestic-wizard>
  </vuestic-widget>
</template>

<script>
  export default {
    name: 'postSignup',
    data () {
      return {
          // how your steps should look like:
        isMale: '',
        vrSteps: [
          {
            label: 'Personal details',
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
            label: 'Almameter',
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
          }
        ]
      }
    }
  }
</script>


<style scoped>
  .align-gender {
    padding-left: 1rem;
  }
  .new{
    background-color: white;
    padding-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
