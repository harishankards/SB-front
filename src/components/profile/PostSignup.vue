<template>

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
      return {}
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

</style>
