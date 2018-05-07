<template>
  <div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
      <i class="fa fa-caret-left"></i>
      Back
    </button>
    <vuestic-widget class="col-md-9" :headerText="this.contestData.title">
      <p><strong> About</strong><br>{{this.contestData.about}}</p>
      <p><strong> Rules and Format</strong><br><span v-html="this.contestData.rulesFormat"></span></p>
      <p><strong> Hosted by</strong><br> {{this.hostData.email}}</p>
      <p><strong>Starts on:</strong>  {{this.contestData.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
      <p><strong>Ends on: </strong> {{this.contestData.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
      <strong>Tags:</strong><span v-for="tag in contestData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <p class="published">Published: <timeago :since="this.contestData.createdAt" :auto-update="60"></timeago></p>
      <div>
        <button class="btn btn-info backbtn" v-show="isStudent" @click="showRegisterModal">Register</button>
      </div>
      <hr>
      <div>
        <div class="comment-section">
        <i class="fa fa-child"></i> {{this.contestData.registrations.length}} people registered
        </div>
        <div class="comment-section">
          <i class="fa fa-share"></i> Share
        </div>
      </div>
      <!-- <vue-disqus shortname="student-burger"></vue-disqus> -->
    </vuestic-widget>
  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'separateContestStudent',
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
    methods: {
      showRegisterModal: function () {
        this.$swal(
          'Success!',
          'You have registered for the contest!',
          'success'
        )
      }
    },
    computed: {
      isStudent: function () {
        if (this.$store.getters.student) {
          return true
        } else {
          return false
        }
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
        secondthis.$http.get('/companies/get?id=' + contestDetails.data.host, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (companyData) {
          // console.log('company data', companyData.data[0])
          secondthis.hostData = companyData.data[0]
          // console.log('company', secondthis.hostData.email)
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

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
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
  .published {
    color: gray;
    margin-top: 1rem;
  }
  .backbtn{
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5%;
  }
</style>
