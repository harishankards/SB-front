<template>
	<vuestic-widget class="col-md-9" :headerText="this.contestData.title">
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
        contestData: '',
        contestId: '',
        hostData: ''
      }
    },
    created () {
      var secondthis = this
      const contestId = this.$route.params.id
      const authToken = this.$ls.get('token')
      this.contestId = contestId
      this.$http.get('contests/get?id=' + contestId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (contestDetails) {
        console.log('contestData', contestDetails.data)
        secondthis.contestData = contestDetails.data
        secondthis.$http.get('/company/get?id=' + contestDetails.data.host, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (companyData) {
          console.log('company data', companyData.data[0])
          secondthis.hostData = companyData.data[0]
          console.log('company', secondthis.hostData.email)
        })
        .catch(function (companyDataErr) {
          console.log('company data err', companyDataErr)
        })
      })
      .catch(function (contestDataErr) {
        console.log('contestDataErr', contestDataErr)
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
