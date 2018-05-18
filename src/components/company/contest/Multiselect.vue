<template>
   <multiselect :value="value" v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
</template>

<script>

import Multiselect from 'vue-multiselect'
import { eventBus } from '../../../main.js'


export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [],
      options: []
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      console.log('tag', tag)
      this.options.push(tag)
      this.value.push(tag)
    }
  },
  updated () {
    eventBus.$emit('multiselectorcontest', this.value)
  },
  created () {
    if (this.$route.path.match('edit')) {
      this.value = eventBus.contestToBeEdited.tags
    }
    const token = this.$ls.get('token')
    const self = this
    this.$http.get('/getalltags', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(function (tagsData) {
      console.log('tagsData', tagsData.data.tags)
      tagsData.data.tags.map((tag) => {
        let tagToBePushed = {
          name: tag.name,
          code: tag.code,
          id: tag._id
        }
        self.options.push(tagToBePushed)
      })
      console.log('options', self.options)
    })
    .catch(function (tagsDataErr) {
      console.log('tagsErr', tagsDataErr)
    })
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>