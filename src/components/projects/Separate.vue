<template>
	<vuestic-widget class="col-md-9" :headerText="this.projectData.title">
    <p><strong> Abstract</strong><br>{{this.projectData.abstract}}</p>
    <p><strong> Description</strong><br><span v-html="this.projectData.description"></span></p>
    <p><strong> Author</strong><br> {{this.authorData.email}}</p>
    <strong>Tags:</strong><span v-for="tag in projectData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
    <hr>
    <div>
      <div class="comment-section">
      <i class="fa fa-thumbs-up"></i> {{this.projectData.upvotes.length}} upvotes
      </div>
      <div class="comment-section">
        <i class="fa fa-share"></i> Share
      </div>
    </div>
    <!-- <vue-disqus shortname="student-burger"></vue-disqus> -->
    
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
      const authToken = this.$ls.get('token')
      this.projectId = projectId
      this.$http.get('projects/get?id=' + projectId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (projectDetails) {
        console.log('projectData', projectDetails.data)
        secondthis.projectData = projectDetails.data
        secondthis.$http.get('/students/get?id=' + projectDetails.data.author, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
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
  #tagDiv {
    display: inline-block;
    margin-top: 1rem;
  }
  .tagNames {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    background: #ff0081;
    color: white;
    border-radius: 5%;
  }
</style>
