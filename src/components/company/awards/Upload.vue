<template>
  <vue-dropzone ref="myVueDropzone" @vdropzone-success="vsuccess" id="dropzone" @vdropzone-removed-file="vremoved" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'
  import { eventBus } from '../../../main.js'

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
        this.$store.state.awardUploadedFile = []
        this.$store.state.awardUploadedFile.push({
          filename: file.name,
          filepath: response.filepath
        })
        console.log('this store filepath', this.$store.state.awardUploadedFile[0].filepath)
        eventBus.$emit('uploadedFileAwards', {
          file: file,
          response: response
        })
      },
      vremoved (file, error, xhr) {
        console.log('file removed', file)
        const filename = file.name
        const filepath = this.$store.state.awardUploadedFile.map(item => {
          if (item.filename === filename) {
            return item.filepath
          }
        })
        console.log('removed filepath', filepath)
        this.$http({
          method: 'delete',
          url: '/attachments',
          data: {
            filepath: filepath
          },
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(function (attachmentDeleted) {
          console.log('attachment deleted', attachmentDeleted)
        })
        .catch(function (attachmentDeleteErr) {
          console.log('unable to delete attachment', attachmentDeleteErr)
        })
      }
    }
  }
</script>