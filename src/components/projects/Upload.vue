<template>
  <vue-dropzone ref="myVueDropzone" @vdropzone-success="vsuccess" id="dropzone" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'
  import { eventBus } from '../../main.js'

  export default {
    name: 'upload',
    components: {
      vueDropzone: vue2Dropzone
    },
    data: function () {
      return {
        token: this.$ls.get('token'),
        dropzoneOptions: {
          url: 'http://localhost:3000/attachments',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { 'Authorization': 'Bearer ' + this.token },
          addRemoveLinks: true,
          dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
        }
      }
    },
    methods: {
      vsuccess (file, response) {
        // console.log('it is success', file, response)
        eventBus.$emit('uploadedFile', {
          file: file,
          response: response
        })
      }
    }
  }
</script>