<template>
  <vue-dropzone ref="myVueDropzone" :destroyDropzone="false" @vdropzone-success="vsuccess" @vdropzone-error="verror" id="dropzone" @vdropzone-removed-file="vremoved" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import { eventBus } from '../../../main.js'
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
        headers: { Authorization: 'Bearer ' + this.token },
        addRemoveLinks: true,
        dictDefaultMessage: '<i class="fa fa-cloud-upload"></i>UPLOAD ME'
      }
    }
  },
  methods: {
    vsuccess (file, response) {
      console.log('it is success', response)
      this.$store.state.awardUploadedFile = []
      this.$store.state.awardUploadedFile.push({
        filename: file.name,
        filepath: (response.url).slice(0, (response.url).indexOf('?')),
        uploadpath: response.url
      })
      console.log(
        'this store filepath',
        this.$store.state.awardUploadedFile[0].filepath
      )
      eventBus.$emit('uploadedFileAwards', {
        response: response
      })
      axios({
        url: response.url,
        method: 'put',
        data: file
      })
      .then(function (res) {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    verror (err) {
      console.log(err)
    },
    vremoved (file, error, xhr) {
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
          Authorization: 'Bearer ' + this.token
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