<template>
  <vue-dropzone ref="myVueDropzone" :destroyDropzone="false" 
    @vdropzone-success="vsuccess" @vdropzone-removed-file="vremoved"
    id="dropzone" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'

  export default {
    name: 'upload',
    components: {
      vueDropzone: vue2Dropzone
    },
    data: function () {
      let sencondThis = this
      return {
        token: this.$ls.get('token'),
        dropzoneOptions: {
          url: 'http://localhost:3000/attachments',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers:
          {
            'Authorization': 'Bearer ' + sencondThis.$ls.get('token'),
            path: 'student/projects'
          },
          addRemoveLinks: true,
          dictDefaultMessage: '<i class="fa fa-cloud-upload"></i>UPLOAD ME'
        }
      }
    },
    methods: {
      vsuccess (file, response) {
        console.log('it is success', response)
        var fileData = {}
        fileData.fileInfo = file
        fileData.type = file.type
        fileData.filepath = response.url.slice(0, response.url.indexOf('?'))
        fileData.key = response.key
        fileData.path = '/company/awards'
        this.$store.commit('addUploadedFiles', fileData)
        console.log(this.$store.getters.uploadedFiles)
        this.$http({
          url: response.url,
          method: 'PUT',
          data: file,
          contentType: fileData.type
        }).then(
          function (res) {
            console.log('sucess function upload', res.config.url)
          },
          err => {
            console.log('error function upload', err)
          }
        )
      },
      verror (err) {
        console.log(err)
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
      }
    },
    created () {
      this.$store.state.projectUploadedFile = []
    }
  }
</script>