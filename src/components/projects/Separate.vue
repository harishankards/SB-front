<template>
	<vuestic-widget class="col-md-9" :headerText="this.projectData.title">
    <p>{{this.projectData.abstract}}</p>
    <p>{{this.projectData.description}}</p>
    <hr>
    <div>
      <i class="fa fa-heart"></i> {{this.projectData.upvotes.length}} upvotes
    </div>
  </vuestic-widget>
</template>

<script>
  export default {
    name: 'separateProject',
    data () {
      return {
        projectData: '',
        projectId: ''
      }
    },
    created () {
      var secondthis = this
      const projectId = this.$route.params.id
      this.projectId = projectId
      this.$http.get('projects/get?id=' + projectId)
      .then(function (projectDetails) {
        console.log('projectData', projectDetails.data)
        secondthis.projectData = projectDetails.data
      })
      .catch(function (projectDataErr) {
        console.log('projectdataerr', projectDataErr)
      })
    }
  }
</script>