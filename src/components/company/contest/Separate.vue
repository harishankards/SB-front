<template>
  <div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
      <i class="fa fa-caret-left"></i>
      Back
    </button>
    <div class="noProjects" v-show="!showContest">
      <h4>Contest Not found</h4>
      <img class="col-md-8" src="../../../assets/vendor/leaflet/404.png" alt="">
    </div>
    <vuestic-widget v-show="showContest" class="col-md-9" :headerText="this.contestData.title">
      <p><strong> About</strong><br>{{this.contestData.about}}</p>
      <p><strong> Rules and Format</strong><br><span v-html="this.contestData.rulesFormat"></span></p>
      <p><strong> Hosted by</strong><br> {{this.hostData.email}}</p>
      <p v-show="this.contestData.date.start"><strong>Starts on:</strong>  {{this.contestData.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
      <p v-show="this.contestData.date.end"><strong>Ends on: </strong> {{this.contestData.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
      <strong>Tags:</strong><span v-for="tag in contestData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <p class="published">Published: <timeago :since="this.contestData.createdAt" :auto-update="60"></timeago></p>
      <div>
        <button class="btn btn-info backbtn" v-show="isOwner" @click="showRegisterModal">View Registrations</button>
      </div>
      <hr>
      <div>
        <div class="comment-section">
        <i class="fa fa-child"></i> {{this.contestData.registrations.length}} people registered
        </div>
         <div class="comment-section" style="cursor:pointer;">
          <button type="button" class="btn-style"  @click="showShareDiv()">         
          <span class="glyphicon glyphicon-share-alt"></span> Share </button> </div>
           <social-sharing :url="url" v-if="shareIcons"
                    :title="contestData.title"
                    :description="contestData.about"
                    quote="Student Burger - The social network of Students and Companies"
                    hashtags="studentburger,socialnetwork,student,company"
                    twitter-user="_studentburger"
                    inline-template>
              <div id="icon-style">
                <network network="email">
                    <i class="fa fa-envelope" style="color:red;cursor:pointer;"></i> Email
                </network>
                <network style="padding-left:12px;" network="facebook">
                  <i class="fa fa-facebook" style="color:#3B5998;cursor:pointer;"></i> Facebook
                </network>
                <network network="googleplus" style="padding-left:12px;">
                  <i class="fa fa-google-plus" style="color:#DB4437;cursor:pointer;"></i> Google +
                </network>
                <network network="linkedin" style="padding-left:12px;">
                  <i class="fa fa-linkedin" style="color:#0077B5;cursor:pointer;"></i> LinkedIn
                </network>
                <network network="twitter" style="padding-left:12px;">
                  <i class="fa fa-twitter" style="color:#1DA1F2;cursor:pointer;"></i> Twitter
                </network>
            </div>
          </social-sharing>
      </div>
      <!-- <vue-disqus shortname="student-burger"></vue-disqus> -->
    </vuestic-widget>
  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'separateContestCompany',
    components: {
      VueDisqus
    },
    data () {
      return {
        contestData: {
          title: '',
          about: '',
          rulesFormat: '',
          date: {
            start: new Date(),
            end: new Date()
          },
          tags: [],
          registrations: []
        },
        url: 'https://studentburger.com' + this.$route.fullPath,
        contestId: '',
        hostData: '',
        showContest: null,
        shareIcons: false
      }
    },
    methods: {
      showRegisterModal: function () {
        this.$swal(
          this.contestData.registrations.length + ' people registered'
        )
      },
      showShareDiv: function () {
        this.shareIcons = !this.shareIcons
      }
    },
    computed: {
      isOwner: function () {
        const email = this.$ls.get('email')
        return this.hostData.email === email
      }
    },
    created () {
      console.log('this route', this.$route)
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
        secondthis.showContest = true
        console.log('contestData', contestDetails.data)
        secondthis.contestData = contestDetails.data
        secondthis.contestData.title = contestDetails.data.title
        secondthis.contestData.about = contestDetails.data.about
        secondthis.contestData.rulesFormat = contestDetails.data.rulesFormat
        secondthis.contestData.date.start = contestDetails.data.date.start
        secondthis.contestData.date.end = contestDetails.data.date.end
        secondthis.contestData.tags = contestDetails.data.tags
        secondthis.contestData.registrations = contestDetails.data.registrations
        secondthis.$http.get('/companies/get?id=' + contestDetails.data.host, {
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
          secondthis.showContest = false
          console.log('company data err', companyDataErr)
        })
      })
      .catch(function (contestDataErr) {
        secondthis.showContest = false
        console.log('contestDataErr', contestDataErr)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  .comment-section {
    display: inline-block;
    margin-left: 5%;
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
  .noProjects {
    text-align: center;
    font-weight: bold;
    // margin-top: 7rem;
  }
  .btn-style{
    border: none;
    width: 100px;
    cursor: pointer;
    background: white;
  }
  .btn-style:hover{
    background:  #f2f2f2;
    border: none;
  }
  #icon-style{
    margin-top: 2%;
    margin-left: 12%; 
    cursor: pointer;
  }
</style>
