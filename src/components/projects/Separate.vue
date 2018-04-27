<template>
	<vuestic-widget class="col-md-9" :headerText="this.projectData.title">
    <p>Author: {{this.authorData.email}}</p>
    <p>{{this.projectData.abstract}}</p>
    <p>{{this.projectData.description}}</p>
    <hr>
    <div>
      <div class="comment-section">
      <i class="fa fa-heart"></i> {{this.projectData.upvotes.length}} upvotes
      </div>
      <div class="comment-section">
        <i class="fa fa-share"></i> Share
      </div>
    </div>
    <vue-disqus shortname="student-burger"></vue-disqus>
    
  </vuestic-widget>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'separateProject',
    components: {
      VueDisqus
    },
    data () {
      return {
        projectData: '',
        projectId: '',
        authorData: ''
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
        secondthis.$http.get('/students/get?id=' + projectDetails.data.author)
        .then(function (studentData) {
          console.log('student data', studentData.data[0])
          secondthis.authorData = studentData.data[0]
          console.log('studet', secondthis.authorData.email)
        })
        .catch(function (studentDataErr) {
          console.log('student data err', studentDataErr)
        })
      })
      .catch(function (projectDataErr) {
        console.log('projectdataerr', projectDataErr)
      })
    }
  }
</script>

<style scoped>
  .comment-section {
    display: inline-block;
    padding-right: 1rem;
  }
</style>
