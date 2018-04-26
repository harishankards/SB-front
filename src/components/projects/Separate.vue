<template>
	<h3>coming soon..</h3>
</template>

<script>
  export default {
    name: 'separate project',
    data () {
      return {
        projectData: ''
      }
    },
    created () {
      const projectId = this.$router.params
      this.$http.get('projects/get/' + projectId)
      .then(function (projectData) {
        console.log('projectData', projectData)
      })
      .catch(function (projectDataErr) {
        console.log('projectdataerr', projectDataErr)
      })
    }
  }
</script>