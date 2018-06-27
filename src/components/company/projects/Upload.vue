<template>
  <vue-dropzone ref="myVueDropzone" :destroyDropzone="false" @vdropzone-success="vsuccess" @vdropzone-error="verror" id="dropzone" @vdropzone-removed-file="vremoved" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import axios from 'axios'

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
        headers:
        {
          Authorization: 'Bearer ' + this.token,
          path: 'company/projects'
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
      fileData.filepath = response.url.slice(0, response.url.indexOf('?'))
      fileData.key = response.key
      fileData.path = '/company/projects'
      this.$store.commit('addUploadedFiles', fileData)
      console.log(this.$store.getters.uploadedFiles)
      axios({
        url: response.url,
        method: 'PUT',
        data: file
      }).then(
        function (res) {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    verror (err) {
      console.log(err)
    },
    vremoved (file, error, xhr) {
      const fileArray = this.$store.getters.uploadedFiles
      if (fileArray.length > 0) {
        console.log(fileArray)
        const removedFile = fileArray.find(function (fileData) {
          return fileData.fileInfo === file
        })
        console.log(removedFile)
        this.$store.commit('removeUploadedFiles', removedFile)
        console.log('removed filepath', removedFile)
        axios({
          method: 'delete',
          url: '/attachments',
          data: {
            key: removedFile.key
          },
          headers: {
            Authorization: 'Bearer ' + this.token,
            path: removedFile.path
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
}
</script>