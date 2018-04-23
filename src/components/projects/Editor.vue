
<template>
  <vue-editor v-model="content"></vue-editor>
</template>

 <script>
  import { VueEditor } from 'vue2-editor'
  import { eventBus } from '../../main.js'

  export default {
    components: {
      VueEditor
    },

    data () {
      return {
        content: '<p>Here goes the desciption</p>'
      }
    },
    updated () {
      eventBus.$emit('editorContent', this.content)
    }
  }
 </script>