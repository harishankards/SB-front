<template>
	<vuestic-widget class="col-md-9" :headerText="this.awardData.title">
    <p><strong> About</strong><br>{{this.awardData.about}}</p>
    <p><strong> Rules and Format</strong><br><span v-html="this.awardData.description"></span></p>
    <p><strong> Hosted by</strong><br> {{this.hostData.email}}</p>
    <p><strong>Starts on:</strong>  {{this.awardData.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
    <p><strong>Ends on: </strong> {{this.awardData.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
    <strong>Tags:</strong><span v-for="tag in awardData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
    <p class="published">Published: <timeago :since="this.awardData.createdAt" :auto-update="60"></timeago></p>
    <hr>
    <div>
      <div class="comment-section">
      <i class="fa fa-child"></i> {{this.awardData.registrations.length}} people registered
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
    name: 'separateAward',
    components: {
      VueDisqus
    },
    data () {
      return {
        awardData: '',
        awardId: '',
        hostData: ''
      }
    },
    created () {
      var secondthis = this
      const awardId = this.$route.params.id
      const authToken = this.$ls.get('token')
      this.awardId = awardId
      this.$http.get('awards/get?id=' + awardId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (awardDetails) {
        console.log('awardData', awardDetails.data)
        secondthis.awardData = awardDetails.data
        secondthis.$http.get('/companies/get?id=' + awardDetails.data.host, {
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
      .catch(function (awardDataErr) {
        console.log('awardDataErr', awardDataErr)
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
  .published {
    color: gray;
    margin-top: 1rem;
  }
</style>
