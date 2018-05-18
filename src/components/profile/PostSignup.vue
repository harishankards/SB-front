<template>
  <vuestic-widget>
    <form-wizard @on-complete="onComplete">
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
        counter: 0
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
      }
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
