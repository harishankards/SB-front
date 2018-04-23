
<template>
  <vue-editor :content="content" v-model="content"></vue-editor>
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
        content: '<p>Here goes the rules, format and special instructions</p>'
      }
    },
    updated () {
      eventBus.$emit('editorContentcontest', this.content)
    }

  }
 </script>