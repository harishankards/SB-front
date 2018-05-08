
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
        content: 'shasdada'
      }
    },
    methods: {
      listenToTheEventBus: function () {
        console.log('inside the editor of the -------------------------')
        eventBus.$on('projectDescriptionEdit', (data) => {
          this.content = data
        })
      }
    },
    updated () {
      eventBus.$emit('editorContentproject', this.content)
    },
    created () {
      this.listenToTheEventBus()
    },
    mounted () {
      console.log('inside the mounted of editor')
    }
  }
 </script>