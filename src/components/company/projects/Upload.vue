<template>
  <vue-dropzone ref="myVueDropzone" :destroyDropzone="false" 
    @vdropzone-success="vsuccess" @vdropzone-removed-file="vremoved"
    id="dropzone" :options="dropzoneOptions"
    :awss3="awss3"
    v-on:vdropzone-s3-upload-error="s3UploadError"
    v-on:vdropzone-s3-upload-success="s3UploadSuccess">
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
          dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
          awss3: {
            signingURL: 'http://localhost:3000/attachments/signedUrlPut', // Where you will get signed url
            headers: { 'Authorization': 'Bearer ' + this.token },
            params: {},
            sendFileToServer: false // If you want to upload file to your server along with s3
          }
        }
      }
    },
    methods: {
      vsuccess (file, response) {
        console.log('it is success', file, response)
        this.$store.state.projectUploadedFile.push({
          filename: file.name,
          signedUrl: response.url
        })
        console.log('this store filepath', this.$store.state.projectUploadedFile)
        eventBus.$emit('uploadedFile', {
          projectUploadedFiles: this.$store.state.projectUploadedFile
        })
      },
      vremoved (file, error, xhr) {
        // const self = this
        console.log('file removed', file)
        const filename = file.name
        const signedUrl = this.$store.state.projectUploadedFile.map(item => {
          if (item.filename === filename) {
            console.log('item filname', item)
            const index = this.$store.state.projectUploadedFile.indexOf(item)
            this.$store.state.projectUploadedFile.splice(index, 1)
            return item.signedUrl
          }
        })
        console.log('removed signedUrl', signedUrl)
        this.$http({
          method: 'delete',
          url: '/attachments',
          data: {
            // filepath: filepath
          },
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then(function (attachmentDeleted) {
          console.log('attachment deleted', attachmentDeleted)
          // self.
        })
        .catch(function (attachmentDeleteErr) {
          console.log('unable to delete attachment', attachmentDeleteErr)
        })
      },
      s3UploadError (err) {
        console.log('s3UploadError', err)
      },
      s3UploadSuccess () {
        console.log('s3UploadSuccess')
      }
    },
    created () {
      this.$store.state.projectUploadedFile = []
    }
  }
</script>