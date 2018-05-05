
<template>
  <vue-editor :content="content" v-model="content" placeholder='Type the rules and format here'></vue-editor>
</template>

 <script>
  import { VueEditor } from 'vue2-editor'
  import { eventBus } from '../../../main.js'

  export default {
    components: {
      VueEditor
    },

    data () {
      return {
        content: ''
      }
    },
    updated () {
      eventBus.$emit('editorContentcontest', this.content)
    }

  }
 </script>