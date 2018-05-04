<template>
  <div class="row">
    <div class="col-md-9">
      <vuestic-widget headerText="Update Profile">
        <div class="form-group col-md-6">
          <div class="input-group">
          <input id="simple-input" required/>
          <label class="control-label" for="simple-input">First Name</label><i class="bar"></i>
          </div>
        </div> 
        <div class="form-group col-md-6">
          <div class="input-group">
          <input id="simple-input" required/>
          <label class="control-label" for="simple-input">Last Name</label><i class="bar"></i>
          </div>
        </div> 
        <div class="form-group col-md-6">
          <div class="input-group">
          <input id="simple-input" required/>
          <label class="control-label" for="simple-input">Username</label><i class="bar"></i>
          </div>
        </div> 
        <div class="form-group col-md-6 align-gender">
          <div class="input-group">
            <div class="radio abc-radio abc-radio-primary">
              <input type="radio" name="male" id="male" value="male" checked>
              <label for="male">
                <span class="abc-label-text">Male</span>
              </label>
              <input type="radio" name="male" id="female" value="female" checked>
              <label for="female">
                <span class="abc-label-text">Female</span>
              </label>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'postSignup',
    data () {
      return {
        isMale: ''
      }
    }
  }
</script>


<style scoped>
  .align-gender {
    padding-left: 1rem;
  }
</style>
