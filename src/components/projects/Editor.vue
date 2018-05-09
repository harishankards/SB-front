
<template>
  <vue-editor v-model="content" placeholder='Type your description here'></vue-editor>
</template>

 <script>
  import { VueEditor } from 'vue2-editor'
  import { eventBus } from '../../main.js'

  export default {
    name: 'editor',
    components: {
      VueEditor
    },

    data () {
      return {
        content: ''
      }
    },
    updated () {
      eventBus.$emit('editorContentproject', this.content)
    },
    created () {
      if (this.$route.path.match('edit')) {
        console.log('before matching')
        console.log('yes matched ---------------------', eventBus.projectToBeEdited.description)
        this.content = eventBus.projectToBeEdited.description
      }
    }
  }
 </script>