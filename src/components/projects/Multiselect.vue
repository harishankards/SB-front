<template>
   <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
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
        { name: 'Computer Science', code: 'cse' }
      ],
      options: [
        {name: 'Computer Science', code: 'cse'},
        { name: 'Electronics', code: 'elec' },
        { name: 'Mechanical', code: 'mech' },
        { name: 'Biotechnology', code: 'Biot' }
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