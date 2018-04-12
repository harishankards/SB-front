
<template>
  <vuestic-medium-editor @initialized="handleEditorInitialization" :editor-options="editorOptions" data-placeholder="Type your description here">
    
  </vuestic-medium-editor>
</template>

<script>
  export default {
    name: 'editor',

    data () {
      return {
        editor: {},
        editorOptions: {
          buttonLabels: 'fontawesome',
          autoLink: true,
          toolbar: {
            buttons: [
              'bold',
              'italic',
              'underline',
              'anchor',
              'h1',
              'h2',
              'h3'
            ]
          }
        }
      }
    },

    methods: {
      handleEditorInitialization (editor) {
        this.editor = editor
      }
    }
  }
</script>