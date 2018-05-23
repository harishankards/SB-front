<template>
	<div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
        <i class="fa fa-caret-left"></i>
        Back
    </button>
    <div class="noProjects" v-show="!showProject">
      <h4>Project Not found</h4>
      <img class="col-md-8" src="../../../assets/vendor/leaflet/404.png" alt="">
    </div>
    <vuestic-widget v-show="showProject" class="col-md-9" :headerText="this.projectData.title">
      <p><strong> Abstract</strong><br>{{this.projectData.abstract}}</p>
      <p><strong> Description</strong><br><span v-html="this.projectData.description"></span></p>
      <p><strong> Author</strong><br> {{this.authorData.email}}</p>
      <strong>Tags:</strong><span v-for="tag in projectData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <hr>
      <div>
        <div v-if="this.projectData" class="comment-section">
        <i class="fa fa-thumbs-up"></i> {{this.projectData.upvotes.length}} upvotes
        </div>
        <div class="comment-section">
          <i class="fa fa-share"></i> SHARE
        </div>
      </div>
      <!-- <vue-disqus shortname="student-burger"></vue-disqus> -->
      
    </vuestic-widget>
  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'separateProjectCompany',
    components: {
      VueDisqus
    },
    data () {
      return {
        projectData: '',
        projectId: '',
        authorData: '',
        showProject: null
      }
    },
    created () {
      var secondthis = this
      const projectId = this.$route.params.id
      const authToken = this.$ls.get('token')
      this.projectId = projectId
      this.$http.get('/companyprojects?id=' + projectId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (projectDetails) {
        secondthis.showProject = true
        console.log('projectData', projectDetails.data)
        secondthis.projectData = projectDetails.data
        secondthis.$http.get('/companies/get?id=' + projectDetails.data.author, {
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
          secondthis.showProject = false
          console.log('student data err', studentDataErr)
        })
      })
      .catch(function (projectDataErr) {
        secondthis.showProject = false
        console.log('projectdataerr', projectDataErr)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
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
    background: $tagcolor;
    color: white;
    border-radius: 5%;
  }
  .backbtn{
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5%;
  }
  .noProjects {
    text-align: center;
    font-weight: bold;
    // margin-top: 7rem;
  }
</style>
