<template>
  <multiselect v-model="value" :options="options" :taggable=true tag-placeholder="Add this as new tag"></multiselect>        
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
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
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>